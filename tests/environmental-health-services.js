var system = require('system')
require('../capture')(300)

var PAYMENT_NUMBER = system.env.ENV_HEALTH_PAYMENT
var ACCESS_CODE = system.env.ENV_HEALTH_ACCESS
var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=b518d3cc-b74c-4360-8a22-687ce6b262c9'
var selectors = {
	paymentInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text',
	accessInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_1_radTxt_text',
	continueButton: '#ctl00_BodyContentHolder_btnLookUp',
	payButton: '#ctl00_BodyContentHolder_btnContinue'
}

casper.test.begin('Streets Closures - Escrow', function suite(test) {
	casper.start(url, function() {
		test.assertTitle('Payment Center - City of Philadelphia')
		this.sendKeys(selectors.paymentInput, PAYMENT_NUMBER)
		this.sendKeys(selectors.accessInput, ACCESS_CODE)
		this.click(selectors.continueButton)
		this.waitForSelector(selectors.payButton, function() {
			test.assertEquals(this.getElementAttribute(selectors.payButton, 'value'), 'Pay Now', '"Pay Now" button exists')
		})
	})
	
	casper.run()
})
