.PHONY: run build install

run: version.go tenjin.go go.mod
	chmod +x tenjin.go
	cd "$GOPATH" && go get github.com/erning/gorun

build: version.go tenjin.go go.mod
	go build "-ldflags=-s -w" ./tenjin.go

install: version.go tenjin.go go.mod
	go install ./tenjin.go
