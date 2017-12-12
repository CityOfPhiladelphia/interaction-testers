var system = require('system');

var selectors = {
	searchInput: '.mb-search-control-input',
	searchButton: '.mb-search-control-button',
};

var topics = ['property', 'condos', 'deeds', 'li', 'zoning', 'nearby'];

// DEBUG
// casper.options.waitTimeout = 1000;

casper.test.begin('Atlas', function suite(test) {
  // set custom interaction testers user agent
  casper.userAgent(system.env.USER_AGENT);

  casper.start('https://atlas.phila.gov');

  // wait for search input to appear
  casper.then(function () {
    casper.waitForSelector(selectors.searchInput, null, null, 10000);
  });

  // search for an address; use a condo address so we get the complete list of
  // topics
  casper.then(function () {
    this.sendKeys(selectors.searchInput, '1911 Green St.');
    this.click(selectors.searchButton);

    // wait for each topic body to appear
    topics.forEach(function (topic) {
      casper.then(function () {
        this.waitForSelector('[data-topic-key="' + topic + '"] + .topic-body');
      });
    });
  });

  casper.run();
})
