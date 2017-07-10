// file with all code / logics
import * as Firebase from 'firebase';
import './../css/style.scss';


$(()=>{

  var buttonFind = $('#find');

  // making map
  function initMap() {
        var relax = {lat: 52.2331846, lng: 21.0109556}; //e.g. point - Cafe Relax
        var map = new google.maps.Map(document.getElementById('map'), { //create a new map elem in #map in HTML
          zoom: 12,
          center: relax
        });

        // geocoding obj
        var geocoder = new google.maps.Geocoder();

        // event dla buttonFind - dodawanie markera z szukaną lokalizacją
        buttonFind.on("click" , (event) => {
          // console.log($('#where').val());
          geocodeAddress(geocoder , map);
        });

        // function converting address
        function geocodeAddress(geocoder, resultsMap) {
          var address = $('#where').val()+",Warszawa";
          // var address = "belwederska 12 , warszawa";
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              var marker2 = new google.maps.Marker({
                  map: resultsMap,
                  position: results[0].geometry.location
              });

            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
  };

  // set key and initialize map
  $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0")
    .done(function(data) {
      initMap();
    });

  // variable with config data to Firebase
  var config = {
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













});
