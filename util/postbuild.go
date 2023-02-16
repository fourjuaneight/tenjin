/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"bytes"
	"image"
	"image/jpeg"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/disintegration/imaging"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/devices"
	"github.com/go-rod/rod/lib/proto"
	lop "github.com/samber/lo/parallel"
)

var local = "http://localhost:2323"

func dist() string {
	// create src directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("[io.Getwd]:", err)
	}
	// go up one directory
	dist := filepath.Join(wd, "dist/")

	return dist
}

func run(cmd string) {
	// create command
	command := exec.Command("sh", "-c", cmd)
	// run command
	err := command.Run()
	if err != nil {
		log.Fatal("[run][exec.Command]:", err)
	}
}

func socialImgs() {
	// run local server
	run("npm run build &")

	var routes []string
	dist := dist()

	// match patterns
	typeMatch := regexp.MustCompile(`(.*\/)(social\.svg)$`)

	// get files
	filepath.Walk(dist, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal("[socialImgs][filepath.Glob]:", err)
		}
		// filter files
		match := typeMatch.MatchString(path)

		// only save matches
		if !info.IsDir() && match {
			cleanPath := strings.Replace(path, dist, local, -1)
			routes = append(routes, cleanPath)
		}

		return nil
	})

	// run local server
	run("npm run serve &")

	// take screenshots
	browser := rod.New().MustConnect().NoDefaultDevice()
	lop.ForEach(routes, func(route string, _ int) {
		// visit route
		page := browser.MustPage(route).MustEmulate(devices.LaptopWithHiDPIScreen)
		page.SetViewport(&proto.EmulationSetDeviceMetricsOverride{
			Width:  1200,
			Height: 630,
		})
		// take screenshot
		imgBytes := page.MustWaitLoad().MustScreenshot("social.jpeg")
		time.Sleep(1000)
		// create image
		distPath := strings.Replace(route, local, dist, -1)
		cleanPath := typeMatch.ReplaceAllString(distPath, "$1")
		imgFile, err := os.Create(filepath.Join(cleanPath, "social.jpeg"))
		if err != nil {
			log.Fatal("[socialImgs][os.Create]:", err)
		}
		defer imgFile.Close()
		// encode image
		img, _, err := image.Decode(bytes.NewReader(imgBytes))
		if err != nil {
			log.Fatal("[socialImgs][image.Decode]:", err)
		}
		dstImg := imaging.Resize(img, 1200, 630, imaging.Lanczos)
		err = jpeg.Encode(imgFile, dstImg, &jpeg.Options{Quality: 100})
		if err != nil {
			log.Fatal("[socialImgs][jpeg.Encode]:", err)
		}
	})

	// kill local server
	run("npx kill-port 2323")
}

func main() {
	log.Println("Creating social images")
	socialImgs()
}
