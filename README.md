# Interaction Testers
Provides a REST API to execute headless browser tests, which can then be used like uptime checks

## Installation
1. Clone this repository and run `npm install`
2. Copy `.env.sample` to `.env` and fill in account numbers for tests

## Developing Tests
Write CasperJS scrapers using the [CasperJS testing framework](http://docs.casperjs.org/en/latest/testing.html).
Place any sensitive variables in `.env` to omit them from source control.

Several utilities are provided to easily test these scrapers while developing, since it would be a pain to have
to run the server each time and request an endpoint in the browser over and over.
```bash
> npm run test tests/test-name.js
```
Loads the environment variables from `.env` and runs the provided test using `--ignore-ssl-errors=true`
```bash
> npm run capture
```
Runs a [web server](https://github.com/maciejjankowski/flaming-octo-puss) at `localhost:8002` that listens
for screenshots from CasperJS tests. To have your tests send screenshots, include `require('../capture')(300)`
at the top, as seen in [water-commercial.js](tests/water-commercial.js)

## Running the Server
```bash
> npm run server
```
Runs a web server with `GET` paths created for each test, using the name of the file without the file extension.
For instance, `http://<domain>.com/water-commercial`. 
The request will respond with a status code of `200` if the test passes and `500` if it fails, along with
the output of the CasperJS test.
