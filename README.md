# Interaction Testers
Provides a REST API to execute headless browser tests, which can then be used like uptime checks

## Installation
1. Clone this repository and run `npm install`
2. Copy `.env.sample` to `.env` - you probably don't need to change anything in it

## Usage
Run the server using `npm run start` then visit **http://localhost:8080/test-name**.
The request will respond with a status code of `200` if the test passes and `500` if it fails.

## Writing Tests
Add tests to the `tests/` directory. Server paths will be generated based on the filename
(without the `.js` extension)