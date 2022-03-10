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
	return Object.keys(object).find(key => object[key].includes(value));
}

function normalisePostcode(postcode) {
	postcode = postcode.toUpperCase();
	let postcodeSpace = postcode[postcode.length - 4];

	if (postcodeSpace != ' ') {
		return postcode.substring(0, postcode.length - 3) + ' ' + postcode.substring(postcode.length - 3);
	}
	else {
		return postcode;
	}
}