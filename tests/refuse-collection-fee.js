var system = require('system')
require('../capture')(300)

var NOTICE_NUMBER = system.env.REFUSE_NOTICE
var OPA_NUMBER = system.env.REFUSE_OPA
var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=4ede6c22-6e9d-43f5-bc12-2ddd22ba0441'
var selectors = {
	noticeInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_1_radTxt_text',
	opaInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text',
	continueButton: '#ctl00_BodyContentHolder_btnLookUp',
	payButton: '#ctl00_BodyContentHolder_btnContinue'
}

casper.test.begin('Streets Closures - Escrow', function suite(test) {
  casper.userAgent(system.env.USER_AGENT)
	casper.start(url, function() {
		test.assertTitle('Payment Center - City of Philadelphia')
		this.sendKeys(selectors.noticeInput, NOTICE_NUMBER)
		this.sendKeys(selectors.opaInput, OPA_NUMBER)
		this.click(selectors.continueButton)
		this.waitForSelector(selectors.payButton, function() {
			test.assertEquals(this.getElementAttribute(selectors.payButton, 'value'), 'Pay Now', '"Pay Now" button exists')
		})
	})
	
	casper.run()
})
