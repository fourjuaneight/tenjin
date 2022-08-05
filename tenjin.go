/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/atotto/clipboard"
	"github.com/fatih/color"
	"github.com/manifoldco/promptui"
	"github.com/zyedidia/highlight"
)

var BuildVersion string = "0.1.6"

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

func highlightFile(path string, contents []byte) {
	// get home directory
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}

	// get file type
	pattern := regexp.MustCompile(`.*\.([a-z]+)$`)
	ext := pattern.ReplaceAllString(path, `$1`)

	// match language
	langTypes := map[string]string{
		"css":  "css",
		"html": "html",
		"js":   "javascript",
		"json": "json",
		"jsx":  "javascript",
		"scss": "css",
		"ts":   "typescript",
		"tsx":  "typescript",
		"yaml": "yaml",
	}

	// load the go syntax file
	syntaxFile, _ := ioutil.ReadFile(home + "/tenjin/syntax/" + langTypes[ext] + ".yaml")

	// parse it into a `*highlight.Def`
	syntaxDef, err := highlight.ParseDef(syntaxFile)
	if err != nil {
		log.Fatal(err)
	}

	// new highlighter from definition
	hl := highlight.NewHighlighter(syntaxDef)

	// convert file's []byte to string
	text := string(contents)
	// highlight the string
	matches := hl.HighlightString(text)

	// split the string into a bunch of lines
	// print the string
	lines := strings.Split(text, "\n")
	for lineN, l := range lines {
		for colN, c := range l {
			// check if the group changed at the current position
			if group, ok := matches[lineN][colN]; ok {
				// check the group name and set the color accordingly (the colors chosen are arbitrary)
				if group == highlight.Groups["statement"] {
					color.Set(color.FgGreen)
				} else if group == highlight.Groups["preproc"] {
					color.Set(color.FgHiRed)
				} else if group == highlight.Groups["special"] {
					color.Set(color.FgBlue)
				} else if group == highlight.Groups["constant.string"] {
					color.Set(color.FgCyan)
				} else if group == highlight.Groups["constant.specialChar"] {
					color.Set(color.FgHiMagenta)
				} else if group == highlight.Groups["type"] {
					color.Set(color.FgYellow)
				} else if group == highlight.Groups["constant.number"] {
					color.Set(color.FgCyan)
				} else if group == highlight.Groups["comment"] {
					color.Set(color.FgHiGreen)
				} else {
					color.Unset()
				}
			}
			// Print the character
			fmt.Print(string(c))
		}
		// This is at a newline, but highlighting might have been turned off at the very end of the line so we should check that.
		if group, ok := matches[lineN][len(l)]; ok {
			if group == highlight.Groups["default"] || group == highlight.Groups[""] {
				color.Unset()
			}
		}

		fmt.Print("\n")
	}
}

func main() {
	repo := "/tenjin/"
	directories := []string{"components", "configs", "templates/deno", "templates/go", "templates/hugo", "templates/nest", "templates/node", "templates/ng", "templates/react", "helpers", "snippets"}

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
	searcher := func(input string, index int) bool {
		file := fileNames[index]
		name := strings.Replace(strings.ToLower(file), " ", "", -1)
		input = strings.Replace(strings.ToLower(input), " ", "", -1)

		return strings.Contains(name, input)
	}

	promptFile := promptui.Select{
		Label:    "Select a file",
		Items:    fileNames,
		Searcher: searcher,
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
		Items: []string{"Save", "Copy", "Preview"},
	}
	_, action, err := promptAction.Run()
	if err != nil {
		log.Fatal(err)
	}

	// execute actions
	switch action {
	case "Save":
		moveFile(file, fileContent)
		color.Cyan("Saved to current directory!")
	case "Copy":
		copyFile(fileContent)
		color.Cyan("Copied to clipboard!")
	case "Preview":
		highlightFile(filePath, fileContent)
	default:
		color.Red("No selection made.")
	}
}
