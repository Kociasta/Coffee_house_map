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
    let distance = 0;
    let adresFromFB;


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
        // distance = moduleDistance.takeDistance(resultLatLng , moduleFirebase.coffeeAddress());
        // console.log(distance);
        // moduleFirebase.coffeeAddress() - this is an array of all cafes - each element is object made of lat() and lng()
        console.log(moduleFirebase.coffeeAddress());

      }
    }

    async function start() {
      await second();

    }

    start()
