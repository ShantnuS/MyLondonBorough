//Hook up the tweet display

$(document).ready(function () {
	let params = (new URL(document.location)).searchParams;
	let postcode = params.get("postcode");

	if (postcode != null) {
		postcode = normalisePostcode(postcode);
		getBorough(postcode);
	}
});

function getBorough(postcode) {
	document.getElementById("borough_result").innerHTML = "Searching...";
	$.getJSON("london_boroughs.json", function(json) {
		var result = getKeyByValue(json, postcode);
		console.log(result);

		if (result != undefined){
			document.getElementById("borough_result").innerHTML = "Your borough is: " + result;
		}
		else{
			document.getElementById("borough_result").innerHTML = "Are you sure '" + postcode + "' is a London Post Code?";
		}
		
	});
}



function getKeyByValue(object, value) {
	// Find corresponding key from list of values of json dict
	return Object.keys(object).find(key => object[key].includes(value));
}

function normalisePostcode(postcode) {
	postcode = postcode.toUpperCase();

	// Remove non alphanumeric characters from postcode
	postcode = postcode.replace(/[^0-9a-z]/gi, '');

	// Legacy stuff to check if postcode had space in it. New method just removes everything non alphanumeric
	// let postcodeSpace = postcode[postcode.length - 4];
	// if (postcodeSpace != ' ') {
	// 	return postcode.substring(0, postcode.length - 3) + ' ' + postcode.substring(postcode.length - 3);
	// }
	// else {
	// 	return postcode;
	// }

	// Add space in correct position of postcode
	return postcode.substring(0, postcode.length - 3) + ' ' + postcode.substring(postcode.length - 3);
}