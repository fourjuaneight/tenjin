VERSION := 0.1.5

.PHONY: run build install

run: tenjin.go go.mod
	chmod +x tenjin.go
	cd "$GOPATH" && go get github.com/erning/gorun

# https://golang.org/cmd/link/
build: tenjin.go go.mod
	sed -i '.bak' 's/BuildVersion string = ".*"/BuildVersion string = "${VERSION}"/g' tenjin.go
	go build -ldflags="-X 'main.BuildVersion=$(VERSION)'" ./tenjin.go

install: tenjin.go go.mod
	go install ./tenjin.go
