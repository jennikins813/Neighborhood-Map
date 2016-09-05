function MyApp() {
	this.defaultLocations = ko.observableArray([
		{
		name: "Bottega Louie",
		tags: "bottega louie",
		position: {lat: 34.046932, lng: -118.256681}
	}, {
		name: "Urth Caffé",
		tags: "urth caffe",
		position: {lat: 34.041974, lng: -118.235426}
	}, {
		name: "The Pie Hole",
		tags: "the pie hole",
		position: {lat: 34.045384, lng: -118.236254}
	}, {
		name: "Groundwork Coffee Co.",
		tags: "Coffeehouse",
		position: {lat: 34.050838, lng: -118.244886}
	}, {
		name: "Pitchon Bakery and Cafe",
		tags: "french bakery",
		position: {lat: 34.048577, lng: -118.254111}
	}, {
		name: "Tierra Mia Coffee",
		tags: "tierra mia coffee",
		position: {lat: 34.07825, lng: -118.262891}
	}, {
		name: "Larchmont Bungalow",
		tags: "red velvet pancakes",
		position: {lat: 34.073184, lng: -118.324013}
	}]);
}

ko.applyBindings(new MyApp());

var map;

// Initialize Google Map
function initMap() {
  	var dtla = {lat: 34.040713, lng: -118.246769};

  	map = new google.maps.Map(document.getElementById('map'), {
    		center: dtla,
    		zoom: 12
  	});

  	// Using Flickr API to pull images and place them on each location
		var showMarkers = function showMarkers() {
     			var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
     			var defaultLoc = new MyApp().defaultLocations();
				// console.log(new MyApp().defaultLocations());

     			for (var i = 0; i < defaultLoc.length; i++) {
     				console.log('inside showmarkers');
     				var marker = new google.maps.Marker({
     					position: defaultLoc[i].position,
     					animation: google.maps.Animation.DROP,
     					map: map,
     				});

     				// Immediately-Invoked function expression(iife): function is
     				// executed immediately after the completion of the definition.
     				(function(mapSame, markerSame, flickr, iLoc) {
     					function addMarker() {
     						$.getJSON( flickerAPI, {
							   tags: defaultLoc[iLoc].tags,
							   tagmode: "any",
							   format: "json"
							})
							   .done(function( data ) {
								   var img = data.items[2].media.m
							    	var imageStr = '<img src="' + img + '">';
								   var infoWindow = new google.maps.InfoWindow({
										content: imageStr + '<br>' + defaultLoc[iLoc].name
									});
									markerSame.addListener('click', function() {
										infoWindow.open(mapSame, markerSame);
										if (markerSame.getAnimation() !== null) {
											markerSame.setAnimation(null);
										} else {
											markerSame.setAnimation(google.maps.Animation.BOUNCE);
											setTimeout(function(){
												marker.setAnimation(null);
											}, 500);
										}
										// infoWindow.open(mapSame, markerSame);
									});
								});
							
     					}
     					return addMarker();
     				})(map, marker, flickerAPI, i);
     			}	
 	};
 			
 	showMarkers();
}