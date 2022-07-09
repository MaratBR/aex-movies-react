# aex-movies-react

## Installation

You can use docker to install this frontend application. Clone this repository and then use `docker build` command to build the container.

```
git clone https://github.com/MaratBR/aex-movies-react
cd aex-movies-react
sudo docker build . -t aex/movies-test-spa:0.1.0 -t aex/movies-test-spa:latest
```

Or if you have Make installed you can just run `make build-image` instead of `docker build` (it will just run the command above).

## Running the container

By default this react application assume that the API is accessable on the same domain (i.e. if your front-end app is https://mysite.com, then your API is https://mysite.com/api/v1) if you want to change API url use API_URL environment variable like so:

```
sudo docker run -e API_URL=https://api.mysite.com -p 3000:80 aex/movies-test-spa
```

## Where's backend?

[Here](https://github.com/MaratBR/AEXMovies)
