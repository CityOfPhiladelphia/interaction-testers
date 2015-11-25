casper.test.begin('Water - Commercial', 2, function suite(test) {
	var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=10243083-f451-49a3-9041-a3b1e4ae7c91'
	casper.start(url, function() {
		test.assertTitle('Payment Center - City of Philadelphia')
		this.sendKeys('#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text', '011-53560-01234-001')
		this.click('#ctl00_BodyContentHolder_btnLookUp')
		this.waitForSelector('#ctl00_BodyContentHolder_btnContinue', function() {
			test.assertEquals(this.getElementAttribute('#ctl00_BodyContentHolder_btnContinue', 'value'), 'Pay Now')
		})
	})
	
	casper.run()
})
