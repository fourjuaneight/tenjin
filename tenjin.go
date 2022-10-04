/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/atotto/clipboard"
	"github.com/fatih/color"
	"github.com/manifoldco/promptui"
	"github.com/urfave/cli/v2"
	"github.com/zyedidia/highlight"
)

var BuildVersion string = "1.0.0"

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
	error := os.WriteFile(path+"/"+name, contents, 0755)
	if error != nil {
		log.Fatal(error)
	}
}

func highlightFile(name string, path string, contents []byte) {
	// get home directory
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}

	// get file type
	pattern := regexp.MustCompile(`.*\.([a-z]{1,3})$`)
	ext := pattern.ReplaceAllString(name, `$1`)

	// match language
	langTypes := map[string]string{
		"conf": "conf",
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
	lang := langTypes["conf"]
	if ext != name {
		lang = langTypes[ext]
	}

	// load the go syntax file
	syntaxFile, _ := os.ReadFile(home + "/tenjin/syntax/" + lang + ".yaml")

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

func prompt(directories []string, home string, repo string, selectedAction string) {
	action := selectedAction
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
	files, err := os.ReadDir(dirPath)
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
		Label:             "Select a file",
		Items:             fileNames,
		Searcher:          searcher,
		StartInSearchMode: true,
	}
	_, file, err := promptFile.Run()
	if err != nil {
		log.Fatal(err)
	}

	// get file contents
	filePath := dirPath + "/" + file
	fileContent, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	// create action selector if no action was passed
	if selectedAction == "" {
		promptAction := promptui.Select{
			Label: "Select a action",
			Items: []string{"Save", "Copy", "Preview"},
		}
		_, actionSelector, err := promptAction.Run()
		if err != nil {
			log.Fatal(err)
		} else {
			action = actionSelector
		}
	}

	// execute actions
	switch action {
	case "save":
		moveFile(file, fileContent)
		color.Cyan("Saved to current directory!")
	case "copy":
		copyFile(fileContent)
		color.Cyan("Copied to clipboard!")
	case "preview":
		highlightFile(file, filePath, fileContent)
	default:
		color.Red("No selection made.")
	}
}

func main() {
	var action string
	repo := "/tenjin/"
	directories := []string{"actions", "components", "configs", "templates/deno", "templates/go", "templates/hugo", "templates/nest", "templates/node", "templates/ng", "templates/react", "helpers", "snippets"}

	// get home directory
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}

	// versioning
	cli.VersionFlag = &cli.BoolFlag{
		Name:    "version",
		Aliases: []string{"v"},
		Usage:   "print app version",
	}

	// help
	cli.AppHelpTemplate = `NAME:
	{{.Name}} - {{.Usage}}

VERSION:
	{{.Version}}

USAGE:
	{{.HelpName}} [optional options]

OPTIONS:
{{range .VisibleFlags}}	{{.}}{{ "\n" }}{{end}}	
`
	cli.HelpFlag = &cli.BoolFlag{
		Name:    "help",
		Aliases: []string{"h"},
		Usage:   "show help",
	}

	// execute app
	app := &cli.App{
		Name:    "tenjin",
		Usage:   "Simple code snippet manager",
		Version: BuildVersion,
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "action",
				Aliases:     []string{"a"},
				Usage:       "file handling action",
				Destination: &action,
			},
		},
		Action: func(*cli.Context) error {
			prompt(directories, home, repo, action)
			return nil
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
