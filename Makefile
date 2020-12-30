.PHONY: run build install

run:
	go get github.com/erning/gorun
	chmod +x tenjin.go

build: version.go tenjin.go go.mod
	go build "-ldflags=-s -w" ./tenjin.go

install:
	go install ./tenjin.go
