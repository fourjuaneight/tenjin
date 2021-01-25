/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/atotto/clipboard"
	"github.com/manifoldco/promptui"
)

var BuildVersion string = "0.1.3"

func copyFile(contents []byte) {
	// convert file's []byte to string
	text := string(contents)
	// and write to clipboard
	clipboard.WriteAll(text)
}

func moveFile(name string, contents []byte) {
	// get current direcotry
	path, err := os.Getwd()
	if err != nil {
		log.Println(err)
	}
	// save file to cwd
	error := ioutil.WriteFile(path+"/"+name, contents, 0755)
	if error != nil {
		log.Fatal(error)
	}
}

func main() {
	cGreen := "\033[32m"
	cReset := "\033[0m"
	repo := "/tenjin/"
	directories := []string{"components", "configs", "templates/nest", "templates/ng", "templates/react", "helpers", "snippets"}

	// get home directory
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}

	// create directory selector
	promptDir := promptui.Select{
		Label: "Select a directory",
		Items: directories,
	}
	_, directory, err := promptDir.Run()
	if err != nil {
		log.Fatal(err)
	}

	// read files from selected directory
	dirPath := home + repo + directory
	files, err := ioutil.ReadDir(dirPath)
	if err != nil {
		log.Fatal(err)
	}

	// save filenames from selection to array
	var fileNames []string
	for _, file := range files {
		fileNames = append(fileNames, file.Name())
	}

	// create file selector
	promptFile := promptui.Select{
		Label: "Select a file",
		Items: fileNames,
	}
	_, file, err := promptFile.Run()
	if err != nil {
		log.Fatal(err)
	}

	// get file contents
	filePath := dirPath + "/" + file
	fileContent, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	// create action selector
	promptAction := promptui.Select{
		Label: "Select a action",
		Items: []string{"Save", "Copy"},
	}
	_, action, err := promptAction.Run()
	if err != nil {
		log.Fatal(err)
	}

	// execute actions
	if action == "Copy" {
		copyFile(fileContent)
		fmt.Printf(cGreen + "Saved to clipboard!" + cReset)
	} else {
		moveFile(file, fileContent)
		fmt.Println(cGreen + "Saved to current directory!" + cReset)
	}
}
