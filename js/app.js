// file with all code / logics

import * as Firebase from 'firebase'; // my coffee places with detail info
import './../css/style.scss';


$(()=>{ // DOM Content Loaded
  // catching HTML elements
  let buttonFind = $('#find');
  let mapId = $('#map')[0]; // jQuery: return Object - I have to pull out div elem
  // initialize variables
  let map;
  let geocoder;

  // variable with config data to get to Firebase
  let config = {
      apiKey: "AIzaSyA0PL06i_Fdi70FkUxOo4I9JToVS-632U8",
      authDomain: "my-awesome-coffee.firebaseapp.com",
      databaseURL: "https://my-awesome-coffee.firebaseio.com",
      projectId: "my-awesome-coffee",
      storageBucket: "my-awesome-coffee.appspot.com",
      messagingSenderId: "58575921422"
    };

  // getting info from database
  let fb = Firebase.initializeApp(config);
  let db = fb.database().ref();
  db.on('value' , (snap) => {
    // find elements with class cafe-name
    $(".cafe-name").each((i , elem) => {
      // set text to name from firebase
      $(elem).text(snap.val()[i].name);
      // set adresses from firebase (to the next elems)
      $(elem).next().text("ul. " + snap.val()[i].adress);
    });
  });

  // making map
  function initMap() {
        let centrum = {lat:  52.229676 , lng: 21.012229}; //my focus on start point
        map = new google.maps.Map( mapId, { //create new map elem in #map
          zoom: 13,
          center: centrum
        });
        // geocoding obj (initialized on top)
        geocoder = new google.maps.Geocoder();
  };

  // function converting address
  function geocodeAddress(geocoder, map2) {
    let myAddress = $('#where').val() + ",Warszawa" ; // get street from input and add Warsaw to address
    geocoder.geocode({'address': myAddress}, function(results, status) {
      if (status === 'OK') {
          map2.setCenter(results[0].geometry.location);
          let marker2 = new google.maps.Marker({
              map: map2,
              position: results[0].geometry.location
          });
      }else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // get street from firebase and add Warsaw to address
  let coffeeAddress;
  db.on('value' , (snap) => {  coffeeAddress = snap.val()[2].adress});

  //function seting cafes from firebase
  function geocodeCafes(geocoder, map2, coffeeAddress) {
    geocoder.geocode({'address': coffeeAddress}, function(results, status) {
      if (status === 'OK') {
          var marker3 = new google.maps.Marker({
              map: map2,
              position: results[0].geometry.location
          });
      }else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // events and  map initialization
  $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0")
    .done(function(data) {

        // event for buttonFind - add markers after set input address
        buttonFind.on("click" , (event) => {
          geocodeAddress(geocoder , map); // decoding address from input + marker
          geocodeCafes(geocoder , map, coffeeAddress); // decoding address from firebase + marker
        });
        // event for press enter
        $('html').on("keyup" , (event) => {
          const enter = 13;
          if(event.keyCode == enter){
            geocodeAddress(geocoder , map); // decoding address from input + marker
            geocodeCafes(geocoder , map, coffeeAddress); // decoding address from firebase + marker
          }
        });

        initMap();
    });





















});
