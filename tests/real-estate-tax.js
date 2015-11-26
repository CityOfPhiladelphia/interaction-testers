var system = require('system')
require('../capture')(300)

var url = 'http://www.phila.gov/revenue/realestatetax/default.aspx'
var selectors = {
	addressInput: '#ctl00_BodyContentPlaceHolder_SearchByAddressControl_txtLookup',
	addressButton: '#ctl00_BodyContentPlaceHolder_SearchByAddressControl_btnLookup',
	accountText: '#ctl00_BodyContentPlaceHolder_GetTaxInfoControl_frm_lblPropertyTaxAccountNo',
	payBillButton: '#ctl00_BodyContentPlaceHolder_GetTaxInfoControl_btn_PayThisBill',
	payNowButton: '#ctl00_BodyContentHolder_btnContinue'
}

casper.test.begin('Real Estate Tax', function suite(test) {
	casper.start(url, function() {
		test.assertTitle('City of Philadelphia | Revenue Department')
		this.sendKeys(selectors.addressInput, '1234 market')
		this.click(selectors.addressButton)
		this.waitForSelector(selectors.accountText, function() {
			test.assertEquals(this.fetchText(selectors.accountText), '883309000', 'Account number matches')
			this.click(selectors.payBillButton)
			this.waitForSelector(selectors.payNowButton, function() {
				test.assertEquals(this.getElementAttribute(selectors.payNowButton, 'value'), 'Pay Now', '"Pay Now" button exists')
			})
		})
	})
	
	casper.run()
})