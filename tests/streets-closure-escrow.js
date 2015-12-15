var system = require('system')
require('../capture')(300)

var COMPANY_ID = system.env.STREETS_CLOSURES_COMPANY
var TAX_ID = system.env.STREETS_CLOSURES_TAX
var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=44a34533-6786-4c28-81fa-5deeb99ae718'
var selectors = {
	companyInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text',
	taxInput: '#ctl00_BodyContentHolder_Manager_CriterionParameter_1_radTxt_text',
	continueButton: '#ctl00_BodyContentHolder_btnLookUp',
	payButton: '#ctl00_BodyContentHolder_btnContinue'
}

casper.test.begin('Streets Closures - Escrow', function suite(test) {
  casper.userAgent(system.env.USER_AGENT)
	casper.start(url, function() {
		test.assertTitle('Payment Center - City of Philadelphia')
		this.sendKeys(selectors.companyInput, COMPANY_ID)
		this.sendKeys(selectors.taxInput, TAX_ID)
		this.click(selectors.continueButton)
		this.waitForSelector(selectors.payButton, function() {
			test.assertEquals(this.getElementAttribute(selectors.payButton, 'value'), 'Pay Now', '"Pay Now" button exists')
		})
	})
	
	casper.run()
})
