module.exports = function(interval) {
	if(system.env.CAPTURE) {  // only capture if listening
		console.log('capturing')
		setInterval(function() {
			casper.evaluate(function(img) {
				__utils__.sendAJAX('http://localhost:8002', 'POST', {img: img}, false)
			}, {img: casper.captureBase64('png')})
		}, interval || 300)
	}
}