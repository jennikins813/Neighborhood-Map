// var app = {
// 	defaultLocations: ko.observableArray[{
// 		name: "Bottega Louie",
// 		tags: "bottega louie",
// 		position: {lat: 34.046932, lng: -118.256681}
// 	}, {
// 		name: "Urth Caffé",
// 		tags: "urth caffe",
// 		position: {lat: 34.041974, lng: -118.235426}
// 	}, {
// 		name: "The Pie Hole",
// 		tags: "the pie hole",
// 		position: {lat: 34.045384, lng: -118.236254}
// 	}, {
// 		name: "Groundwork Coffee Co.",
// 		tags: "Coffeehouse",
// 		position: {lat: 34.050838, lng: -118.244886}
// 	}, {
// 		name: "Pitchon Bakery and Cafe",
// 		tags: "french bakery",
// 		position: {lat: 34.048577, lng: -118.254111}
// 	}, {
// 		name: "Tierra Mia Coffee",
// 		tags: "tierra mia coffee",
// 		position: {lat: 34.07825, lng: -118.262891}
// 	}, {
// 		name: "Larchmont Bungalow",
// 		tags: "red velvet pancakes",
// 		position: {lat: 34.073184, lng: -118.324013}
// 	}],
// 	str: ko.observable("KO")
// };
// var app = new App();
// ko.applyBindings(app);
// // This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
// // var AppViewModel = function(first, last) {}
// function AppViewModel(first, last) {
//     this.firstName = ko.observable(first);
//     this.lastName = ko.observable(last);
//     this.fullName = ko.computed(function() {
//         return this.firstName() + " " + this.lastName();
//     }, this);
//     this.capitalizeLastName = function() {
//         var currentVal = this.lastName();        // read the current value
//         this.lastName(currentVal.toUpperCase());    //write back a modified value
//     };
// }

// // Activates knockout.js
// ko.applyBindings(new AppViewModel("Zombie", "Brains"));