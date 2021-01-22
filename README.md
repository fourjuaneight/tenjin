# Tenjin ⛩️

A simple utility that uses [promptui](https://github.com/manifoldco/promptui) and [clipboard](https://github.com/atotto/clipboard) to copy templates, snippets, and config files for commonly used Angular and React configurations, onto the current directory.

This is mostly for personal use, but PRs are welcomed. This is my one and only Go script, so please be gentle.

## Usage
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
