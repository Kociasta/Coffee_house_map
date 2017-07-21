// file with all code / logics

import * as Firebase from 'firebase'; // my coffee places with detail info
import './../css/style.scss';
import moduleFirebase from './fb.js';
import moduleDistance from './distance.js';
import moduleInitMap from './initMap.js';
import moduleGeocodeMyAddress from './geocodeMyAddress.js';
import moduleSortCafes from './sortCafes.js';
import moduleSetNameSetAddress from './setNamesetAddress.js';
import moduleMyMarker from './myMarker.js';
import moduleCafeMarker from './cafeMarker.js';

    const enter = 13;

    // initialize variables
    let map ;
    let geocoder;


    async function first() {
      await $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBYDAQpbxOhU7n07Tc_flZ8XxtzsyF-lm0&libraries=geometry");

      moduleInitMap.initMap();
      map = moduleInitMap.map();
      geocoder = moduleInitMap.geocoder();

      moduleFirebase.setName(); // set name of Cafe and address - random

    }

    async function second() {
      await first();

      let allCafes;
      let markersMy = [];
      let markersCafes = [];
      let infowindow = new google.maps.InfoWindow();

      function findCafes() {
        allCafes = null; // it could not be here
        moduleGeocodeMyAddress.geocodeAddress(geocoder , map , $('#where').val() , onGeocoded);
        // clearing input value
        $('#where').val(" ") ;

        // if arrays are not empty - remove markers
        if(markersMy[0] && markersCafes[0]){
          markersMy[0].setMap(null);
          for(let i = 0 ; i<4 ; i++){
            markersCafes[i].setMap(null);
          }
        }
        // after all - cut out previous search
        markersMy.splice(0,1);
        markersCafes.splice(0,4);
      }

      function onGeocoded(resultLatLng) {
        // make MARKER of my searching address
        let myPositionMarker = moduleMyMarker.setMyMarker(resultLatLng , map);
        markersMy.push(myPositionMarker);

        // sorting data in distance order
        allCafes = moduleSortCafes.allCafes(resultLatLng);
        // setting Name i Address in HTML (nearest)
        moduleSetNameSetAddress.set(allCafes);

        // make MARKERS of nearest Cafes
        for(let i = 0 ; i<4 ; i++){
          markersCafes.push(moduleCafeMarker.setCafeMarker(allCafes[i][0] , map , allCafes[i][1].name() ) );
          markersCafes[i].addListener('mouseover', function() {
    	        infowindow.setContent(markersCafes[i].title);
              infowindow.open(map, markersCafes[i]);
          });
          markersCafes[i].addListener('mouseout', function() {
            infowindow.close(map, markersCafes[i]);
          });

        }

        //delete last elem of each cafe - which is counted distance
        allCafes.forEach((elem , i) => {
            elem.splice(-1,1);
        });
      }


      //EVENTS
      $('html').on("keyup" , (event) => {
        if(event.keyCode == enter){
          findCafes();
        }
      });

      $('#find').on('click' , (event) => {
        findCafes();
      });



    }

    async function start() {
      await second();
    }

    start()
