// file with all code / logics

import * as Firebase from 'firebase'; // my coffee places with detail info
import './../css/style.scss';
import moduleFirebase from './fb.js';
import moduleDistance from './distance.js';
import moduleInitMap from './initMap.js';
import moduleGeocodeMyAddress from './geocodeMyAddress.js';
import modulesortCafes from './sortCafes.js';

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
        // moduleFirebase.coffeeAddress() - this is an array of all cafes - each element is 2 elem array which contains 2 objects (1. made of lat() and lng() and 2. made of name and adress)
        let allCafes = modulesortCafes.allCafes(resultLatLng);

        // let allCafes = moduleFirebase.coffeeAddress();
        //
        // allCafes.forEach((elem, i ) => {
        //   allCafes[i].push(moduleDistance.takeDistance(resultLatLng , elem[0]));
        // });
        //
        // allCafes.sort(function(a, b){return a[2]-b[2]}); // sort order - 3rd elem - distance
        console.log(allCafes);
      }
    }

    async function start() {
      await second();

    }

    start()
