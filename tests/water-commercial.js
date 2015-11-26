var system = require('system')
require('../capture')(300)

var ACCOUNT_NUMBER = system.env.ACCOUNT_WATER_COMMERCIAL
var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=10243083-f451-49a3-9041-a3b1e4ae7c91'
var selectors = {
	accountInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text',
	lookupButton: '#ctl00_BodyContentHolder_btnLookUp',
	payButton: '#ctl00_BodyContentHolder_btnContinue'
}

casper.test.begin('Water - Commercial', function suite(test) {
	casper.start(url, function() {
		test.assertTitle('Payment Center - City of Philadelphia')
		this.sendKeys(selectors.accountInput, ACCOUNT_NUMBER)
		this.click(selectors.lookupButton)
		this.waitForSelector(selectors.payButton, function() {
			test.assertEquals(this.getElementAttribute(selectors.payButton, 'value'), 'Pay Now', '"Pay Now" button exists')
		})
	})
	
	casper.run()
})
