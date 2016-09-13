var map;

// Initialize Google Map
function initMap() {
    var dtla = {
        lat: 34.040713,
        lng: -118.246769
    };

    function setMap(callback) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: dtla,
            zoom: 13
        });

        callback();
    }

    setMap(function() {
        ko.applyBindings(new MyApp());
    });
}
//Error handling function that alerts user if Google Map scripts cannot be loaded
function googleError() {
    alert(" ⛔❗Failed to load Google Maps. Please try again later");
}

function MyApp() {
    var that = this;
    var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    var infoWindowsFlickr = function(mapSame, markerSame, iSame) {
        function addMarker() {
            console.log(that.defaultLocations()[iSame]);
            $.getJSON(flickerAPI, {
                tags: that.defaultLocations()[iSame].tags,
                tagmode: "any",
                format: "json"
            })

            .done(function(data) {
                var img = data.items[2].media.m;
                var imageStr = '<img src="' + img + '">';
                var infoWindow = new google.maps.InfoWindow({
                    content: imageStr + '<br><span class="b-name">' + that.defaultLocations()[iSame].name + '</span>'
                });

                function toggleBounce() {
                    var markerLength = that.markers().length;
                    for (var j = 0; j < markerLength; j++) {
                        // console.log(that.infoWindows()[j]);
                        that.infoWindows()[j].close();
                        that.markers()[j].setAnimation(null);
                    }
                    if (markerSame.getAnimation() === null) {
                        markerSame.setAnimation(google.maps.Animation.BOUNCE);
                        infoWindow.open(mapSame, markerSame);
                    } else {
                        markerSame.setAnimation(null);
                        infoWindow.close(mapSame, markerSame);
                    }
                }

                that.infoWindows.push(infoWindow);
                that.markers.push(markerSame);
                that.openMarkersFromList.push(markerSame);
                that.openInfoWindowsFromList.push(infoWindow);

                markerSame.addListener('click', toggleBounce);
            })

            .fail(function(jqXHR, textStatus, errorThrown) {
                $('#locList').html("<h3> ⛔✋Request for Flickr resources failed. Please try again later</h3>");
                console.log('textStatus: ', textStatus, " code: ", jqXHR.status);
            });
        }

        return addMarker();
    };

    // Model (data)
    that.defaultLocations = ko.observableArray([{
        name: "Bottega Louie",
        tags: "bottega louie",
        position: { lat: 34.046932, lng: -118.256681 }
    }, {
        name: "Urth Caffé",
        tags: "urth caffe",
        position: { lat: 34.041974, lng: -118.235426 }
    }, {
        name: "The Pie Hole",
        tags: "the pie hole",
        position: { lat: 34.045384, lng: -118.236254 }
    }, {
        name: "Groundwork Coffee Co.",
        tags: "Coffeehouse",
        position: { lat: 34.050838, lng: -118.244886 }
    }, {
        name: "Pitchon Bakery and Cafe",
        tags: "french bakery",
        position: { lat: 34.048577, lng: -118.254111 }
    }, {
        name: "Tierra Mia Coffee",
        tags: "tierra mia coffee",
        position: { lat: 34.07825, lng: -118.262891 }
    }, {
        name: "Larchmont Bungalow",
        tags: "red velvet pancakes",
        position: { lat: 34.073184, lng: -118.324013 }
    }]);

    this.markers = ko.observableArray([]);
    this.infoWindows = ko.observableArray([]);

    this.openMarkersFromList = ko.observableArray([]);
    this.openInfoWindowsFromList = ko.observableArray([]);

    this.defaultLocationsTemp = ko.observableArray([{
        name: "Bottega Louie",
        tags: "bottega louie",
        position: { lat: 34.046932, lng: -118.256681 }
    }, {
        name: "Urth Caffé",
        tags: "urth caffe",
        position: { lat: 34.041974, lng: -118.235426 }
    }, {
        name: "The Pie Hole",
        tags: "the pie hole",
        position: { lat: 34.045384, lng: -118.236254 }
    }, {
        name: "Groundwork Coffee Co.",
        tags: "Coffeehouse",
        position: { lat: 34.050838, lng: -118.244886 }
    }, {
        name: "Pitchon Bakery and Cafe",
        tags: "french bakery",
        position: { lat: 34.048577, lng: -118.254111 }
    }, {
        name: "Tierra Mia Coffee",
        tags: "tierra mia coffee",
        position: { lat: 34.07825, lng: -118.262891 }
    }, {
        name: "Larchmont Bungalow",
        tags: "red velvet pancakes",
        position: { lat: 34.073184, lng: -118.324013 }
    }]);

    this.markersTemp = ko.observableArray([]);    
    this.userLoc = ko.observable(null);

    // ViewModel (methods)
    // Markers are set on locations when map is loaded
    this.showMarkers = ko.computed(function() {
        // console.log('hi');
        var locLength = that.defaultLocations().length;
        for (var i = 0; i < locLength; i++) {
            var marker = new google.maps.Marker({
                position: that.defaultLocations()[i].position,
                animation: google.maps.Animation.DROP,
                map: map
            });
            // console.log('marker:', marker);

            // Immediately-Invoked function expression(iife): function is
            // executed immediately after the completion of the definition.
            (function(mapSame, markerSame, iSame) {
                infoWindowsFlickr(mapSame, markerSame, iSame);
            })(map, marker, i);
        }
    });

    this.search = function(_userLoc) {
        that.infoWindows().forEach(function(val, idx, arr) {
            val.close();
        });
        that.infoWindows.removeAll();

        // Close all infoWindows and remove from array
        that.openInfoWindowsFromList().forEach(function(val, idx, arr) {
            that.openInfoWindowsFromList()[idx].close();
        });
        that.openInfoWindowsFromList.removeAll();

        // Remove markers from map and remove from array
        that.openMarkersFromList().forEach(function(val, idx, arr) {
            that.openMarkersFromList()[idx].setMap(null);
        });
        that.openMarkersFromList.removeAll();

        if (that.userLoc() === null || _userLoc === null) {
            console.log('user input blank');
            that.defaultLocations.removeAll();
            that.defaultLocationsTemp().forEach(function(val, idx, arr) {
                that.defaultLocations.push(val);
            });
        } else {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 34.040713, lng: -118.246769 },
                zoom: 12
            });
            that.defaultLocations.removeAll();
            
            that.markers().forEach(function(val, idx, arr) {
                that.markers()[idx].setMap(null);
            });
            that.markers.removeAll();

            that.openMarkersFromList().forEach(function(val, idx, arr) {
                that.openMarkersFromList()[idx].setMap(null);
            });
            that.openMarkersFromList.removeAll();

            for (var k = 0; k < that.defaultLocationsTemp().length; k++) {
                // console.log(that.defaultLocationsTemp());
                var nameLowercase = that.defaultLocationsTemp()[k].name.toLowerCase();
                (function(sameNameLowercase, sameK) {
                    // http://stackoverflow.com/questions/1789945/how-to-check-if-one-string-contains-another-substring-in-javascript
                    if (sameNameLowercase.indexOf(that.userLoc().toLowerCase()) !== -1) {

                        that.defaultLocations.push(that.defaultLocationsTemp()[sameK]);
                        console.log(that.defaultLocations());
                    } else {
                        console.log('none');
                    }
                })(nameLowercase, k);
            }
        }
    };

    this.openInfoWindow = function(place) {
        console.log('place:', place);
        
        var marker = new google.maps.Marker({
            position: place.position,
            map: map
        });

        $.getJSON(flickerAPI, {
            tags: place.tags,
            tagmode: "any",
            format: "json"
        })

        .done(function(data) {
            var img = data.items[2].media.m;
            var imageStr = '<img src="' + img + '">';
            var infoWindow = new google.maps.InfoWindow({
                content: imageStr + '<br><span class="b-name">' + place.name + '</span>'
            });

            that.openInfoWindowsFromList.removeAll();

            that.openMarkersFromList.removeAll();

            that.openMarkersFromList.push(marker);
            that.openInfoWindowsFromList.push(infoWindow);
            infoWindow.open(map, marker);
        }); 
    };

    this.showAll = function() {
        var userLoc = null;
        document.getElementById('userLoc').value = '';
        that.search(userLoc);
    };
}