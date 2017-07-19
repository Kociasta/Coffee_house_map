// file with all code / logics

import * as Firebase from 'firebase'; // my coffee places with detail info
import './../css/style.scss';
import moduleFirebase from './fb.js';
import moduleDistance from './distance.js';
import moduleInitMap from './initMap.js';
import moduleGeocodeMyAddress from './geocodeMyAddress.js';

    const enter = 13;
    // catching HTML elements
    let buttonFind = $('#find');
    // initialize variables
    let map ;
    let geocoder;
    let x;
    let result = 0;
    let adres = {
      lat: function(){ return 52.21414124},
      lng: function(){return 12.23423423},
    }

    async function first() {
      await $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0&libraries=geometry");

      moduleInitMap.initMap();
      map = moduleInitMap.map();
      geocoder = moduleInitMap.geocoder();
      moduleFirebase.setName();
      moduleFirebase.setAddress();

    }

    async function second() {
      await first();

      $('html').on("keyup" , (event) => { // event on Enter up
        if(event.keyCode == enter){

          moduleGeocodeMyAddress.geocodeAddress(geocoder , map , $('#where').val() , onGeocoded);

        }
      });

      function onGeocoded(resultLatLng) {
        // console.log(resultLatLng);
        result = moduleDistance.takeDistance(resultLatLng , adres);
        console.log(result);
      }
    }

    async function start() {
      await second();
    }

    start()
