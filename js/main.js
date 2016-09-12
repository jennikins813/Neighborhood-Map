var map = null;

// Initialize Google Map
function initMap() {
  	var dtla = {
  		lat: 34.040713,
  		lng: -118.246769
  	};

  	// console.log(google);
  	function setMap(callback) {
	  	map = new google.maps.Map(document.getElementById('map'), {
	 		center: dtla,
	 		zoom: 12
	  	});

	  	callback();
  	}

  	setMap(function() {
  		ko.applyBindings(new MyApp());
  	});
}

function MyApp() {
	var that = this;
	var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

	var infoWindowsFlickr = function(mapSame, markerSame, iSame) {
		function addMarker() {
			console.log(that.defaultLocations());
			console.log(that.defaultLocations()[iSame]);
			console.log(iSame);
			console.log(markerSame);
			$.getJSON( flickerAPI, {
			   tags: that.defaultLocations()[iSame].tags,
			   tagmode: "any",
			   format: "json"
			}
		)
		   .done(function( data ) {
			   var img = data.items[2].media.m
		    	var imageStr = '<img src="' + img + '">';
			   var infoWindow = new google.maps.InfoWindow({
					content: imageStr + '<br><span class="b-name">' + that.defaultLocations()[iSame].name + '</span>'
				});

				function toggleBounce() {
					for (var j = 0; j < that.markers().length; j++) {
						// console.log(that.infoWindows()[j]);
						that.infoWindows()[j].close();
						that.markers()[j].setAnimation(null);
					}
					if (markerSame.getAnimation() == null) {
					 markerSame.setAnimation(google.maps.Animation.BOUNCE);
					 infoWindow.open(mapSame, markerSame);
					} else {
					 markerSame.setAnimation(null);
					 infoWindow.close(mapSame, markerSame);
					}
		      }

		      // set values to specific index in array, instead of 'pushing'
		      that.infoWindows()[iSame] = infoWindow;
		      that.markers()[iSame] = markerSame;

		      console.log(that.infoWindows());
				markerSame.addListener('click', toggleBounce);
			})
			.error(function(err) {
				console.log(err);
			});
		
		}
		return addMarker();
	};		

	// Model (data)
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
	this.infoWindows = ko.observableArray([]);
	this.markers = ko.observableArray([]);

	this.defaultLocationsTemp = ko.observableArray([
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
	this.userLoc = ko.observable(null);

	// ViewModel (methods)
	this.showMarkers = ko.computed(function() {
		console.log('hi');

		for (var i = 0; i < that.defaultLocations().length; i++) {
			var marker = new google.maps.Marker({
				position: that.defaultLocations()[i].position,
				map: map
			});
			// console.log('marker:', marker);

			// Immediately-Invoked function expression(iife): function is
			// executed immediately after the completion of the definition.
			(function(mapSame, markerSame, iSame) {
				infoWindowsFlickr(mapSame, markerSame, iSame);				
			})(map, marker, i)
		}
	});

	this.search = function() {
		// console.log(document.getElementsByClassName('d-list'));
		// nodeList vs arrayList
		// document.getElementsByClassName('d-list')[0].style.display = 'none';
		for (var i = 0; i < that.defaultLocations().length; i++) {
			that.defaultLocationsTemp.push(that.defaultLocations()[i]);
		}
		// that.defaultLocationsTemp = that.defaultLocations;
		console.log(that.defaultLocationsTemp());
		// that.defaultLocations = ko.observableArray([]);
		that.defaultLocations.removeAll();
		console.log(that.defaultLocationsTemp());

		// console.log(that.defaultLocations());
		for (var j = 0; j < that.markers().length; j++) {
			that.markers()[j].setMap(null);
		}
		console.log(that.defaultLocationsTemp().length);
		for (var k = 0; k < that.defaultLocationsTemp().length; k++) {
			var arrayCounter = 0;
			// console.log(that.defaultLocationsTemp());
			var nameLowercase = that.defaultLocationsTemp()[k].name.toLowerCase();
			(function(sameNameLowercase) {
				// http://stackoverflow.com/questions/1789945/how-to-check-if-one-string-contains-another-substring-in-javascript
				if (sameNameLowercase.indexOf(that.userLoc().toLowerCase()) !== -1) {
					// console.log('equal');
					console.log(arrayCounter);
					that.defaultLocations.push(that.defaultLocationsTemp()[k]);
					that.markers()[k].setMap(map);
					console.log(that.defaultLocations());

					var marker = new google.maps.Marker({
						position: that.defaultLocationsTemp()[k].position,
						map: map
					});
					// console.log('marker:', marker);

					// Immediately-Invoked function expression(iife): function is
					// executed immediately after the completion of the definition.
					(function(mapSame, markerSame, arrayCounterSame) {
						infoWindowsFlickr(mapSame, markerSame, arrayCounterSame);				
					})(map, marker, arrayCounter)
					arrayCounter++;

				} else {
					console.log('none');
				}
			})(nameLowercase);
		}
		// console.log(that.defaultLocations());
	};
}