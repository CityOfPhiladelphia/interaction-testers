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

  casper.start('http://atlas.phila.gov.s3-website-us-east-1.amazonaws.com');

	casper.on('page.error', function (msg, trace) {
		this.echo('Error: ' + msg, 'ERROR');
	});

  // wait for search input to appear
  casper.then(function () {
    test.assertTitle('Atlas | phila.gov')
    casper.waitForSelector(selectors.searchInput, null, function () {
			casper.capture('screenshots/atlas0.png');
      var innerHtml = casper.evaluate(function () {
        return document.documentElement.innerHTML;
      });
      console.log(innerHtml);
    }, 10000);
  });

  // search for an address; use a condo address so we get the complete list of
  // topics
  casper.then(function () {
		casper.capture('screenshots/atlas1.png');


    this.sendKeys(selectors.searchInput, '1911 Green St.');
    this.click(selectors.searchButton);

    // wait for each topic body to appear
    topics.forEach(function (topic) {
      casper.then(function () {
        this.waitForSelector('[data-topic-key="' + topic + '"] + .topic-body');
      });
    });
		casper.capture('screenshots/atlas2.png');
  });

	casper.then(function () {
		casper.capture('screenshots/atlas3.png');
	})

  casper.run();
})
