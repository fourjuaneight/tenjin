# Tenjin ⛩️

A simple utility that uses [promptui](https://github.com/manifoldco/promptui) and [clipboard](https://github.com/atotto/clipboard) to copy templates, snippets, and config files for commonly used Angular and React configurations, onto the current directory.

> Disclaimer: These are *my* commonly used templates, snippets, etc. You are welcome to use all of these. But I encourage you to add your own. PRs are also welcome with anything you feel should be added.

## Install

There are 3 ways to run the script:

### [Gorun](https://github.com/erning/gorun#how-to-build-and-install-gorun-from-source)
```sh
make run
# script should run from root of repo
./tenjin.go
```

### Local Binary
```sh
make build
# binary should be accessible from root of repo
./tenjin
```

### [GOPATH Binary](https://github.com/fourjuaneight/dotfiles/blob/master/homedir/.zshenv#L16-L20)
```sh
make install
# binary should be accessible from anywhere
tenjin
```

## Usage

- You will be prompted with a list of categories that correspond to the directories inside `/templates/`.
- Once a selection is made, you will be presented with a list of files to choose from.
- A list of 3 options will be present to you:
  - Save - to current working directory
  - Copy - to local clipboard
  - Preview - on the terminal

You can run `tenjin -h` for more info on how to use the app.

## Adding Templates

The categories selection is based on the directory structure of `/templates/`. This is auto generated and will pick up any new directories you add. Same goes for any new files you add to these directories.

A shallow directory structure is assumed. Therefore, nested directories will not work. While they will be picked up and present to you, selecting one of these will yield an error.
