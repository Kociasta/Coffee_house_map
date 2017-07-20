// file with all code / logics

import * as Firebase from 'firebase'; // my coffee places with detail info
import './../css/style.scss';
import moduleFirebase from './fb.js';
import moduleDistance from './distance.js';
import moduleInitMap from './initMap.js';
import moduleGeocodeMyAddress from './geocodeMyAddress.js';
import moduleSortCafes from './sortCafes.js';
import moduleSetNameSetAddress from './setNamesetAddress.js';

    const enter = 13;

    // initialize variables
    let map ;
    let geocoder;


    async function first() {
      await $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0&libraries=geometry");

      moduleInitMap.initMap();
      map = moduleInitMap.map();
      geocoder = moduleInitMap.geocoder();

      moduleFirebase.setName(); // set name of Cafe and address

    }

    async function second() {
      await first();

      let allCafes;

      $('html').on("keyup" , (event) => { // event on Enter up
        if(event.keyCode == enter){
          allCafes = null; // it could not be here
          moduleGeocodeMyAddress.geocodeAddress(geocoder , map , $('#where').val() , onGeocoded);
          // clearing input value
          $('#where').val(" ") ;
        }
      });

      function onGeocoded(resultLatLng) {
        // sorting data in distance order
        allCafes = moduleSortCafes.allCafes(resultLatLng);
        // setting Name i Address in HTML (nearest)
        moduleSetNameSetAddress.set(allCafes);
        allCafes.forEach((elem , i) => {
            elem.splice(-1,1);
        });


      }
    }

    async function start() {
      await second();

    }

    start()
