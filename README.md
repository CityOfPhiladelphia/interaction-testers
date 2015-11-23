# Interaction Testers
Provides a REST API to execute headless browser tests, which can then be used like uptime checks

## Installation
Clone this repository and run `npm install`

## Usage
Run the server using `npm run start` then visit [localhost:8080](http://localhost:8080) in the browser.
The request will respond with a status code of `200` if the test passes and `500` if it fails.