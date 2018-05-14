// Initialize Firebase
var config = {
	apiKey: "AIzaSyCVJAcewg7ZHC3VXsm2xQlA03MuejB61gE",
	authDomain: "live-clickdownjlp7.firebaseapp.com",
	databaseURL: "https://live-clickdownjlp7.firebaseio.com",
	projectId: "live-clickdownjlp7",
	storageBucket: "live-clickdownjlp7.appspot.com",
	messagingSenderId: "898987740562"
};

firebase.initializeApp(config);

var database = firebase.database();





var connectionsRef = database.ref('/connections');

var connectedRef = database.ref('.info/connected');

connectedRef.on('value', function(snap) {

	if (snap.val()) {

		var con = connectionsRef.push(true);

		con.onDisconnect().remove();

	}

});

connectionsRef.on('value', function(snap) {

	$('watchers').html(snap.numChildren());
})

var initialValue = 100;
var clickCounter = initialValue;

database.ref('/clicks').on('value', function(snapshot) {

	console.log(snapshot.val());

	clickCounter = snapshot.val().clickCount;

	console.log(clickCounter);

	$('#click-value').html(snapshot.val().clickCount);

	$('#click-value').html(clickCounter);
}, function(errorObject) {
	console.log('The read failed: ' + errorObject.code);
});





$('#click-button').on('click', function() {

	clickCounter--;

	if (clickCounter === 0) {
		alert('Phew! You made it! That sure was a lot of clicking');
		clickCounter = initialValue;
	}

	database.ref('/clicks').set({
		clickCount: clickCounter
	});

	console.log(clickCounter);

});

$('#restart-button').on('click', function() {

	clickCounter = initialValue;

	database.ref('/clicks').set({
		clickCount: clickCounter
	});

	console.log(clickCounter);

	$('#click-value').html(clickCounter);
});