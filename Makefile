.PHONY: build install

build: version.go main.go go.mod
	go build "-ldflags=-s -w" ./main.go

install:
	go install ./main.go
