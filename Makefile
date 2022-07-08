IMAGE_NAME := aex/movies-test-spa
VERSION := 0.1.0

build-image:
	sudo docker build . -t aex/movies-test-spa:$(VERSION) -t aex/movies-test-spa:latest