// file with all code / logics
import './../css/style2.scss';
import moduleFirebase from './fb.js';
import moduleDistance from './distance.js';
import moduleInitMap from './initMap.js';
import moduleGeocodeMyAddress from './geocodeMyAddress.js';
import moduleSortCafes from './sortCafes.js';
import moduleSetCafesInfo from './setCafesInfo.js';
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


      moduleFirebase.setName(map); // set name of Cafe and address - random

    }

    async function second() {
      await first();

      let allCafes;
      let markersMy = [];
      let markersCafes = [];
      let infowindow = new google.maps.InfoWindow();
      //
      // function onLoad() {
      //
      //   let _all = moduleFirebase.coffeeAddress();
      //   // console.log(_allCafes);
      //   for(let i = 0 ; i<4 ; i++){
      //     markersMy.push(moduleCafeMarker.setCafeMarker(_all[i][0] , map , _all[i][1].name() ));
      //   }
      //   console.log(markersMy);
      // }

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
        moduleSetCafesInfo.setCafesInfo(allCafes);

        // make MARKERS of nearest Cafes
        for(let i = 0 ; i<4 ; i++){
          markersCafes.push(moduleCafeMarker.setCafeMarker(allCafes[i][0] , map , allCafes[i][1].name() ) );

          // markersCafes[i].addListener('mouseover', function() {
    	    //     infowindow.setContent(markersCafes[i].title);
          //     infowindow.open(map, markersCafes[i]);
          // });
          // markersCafes[i].addListener('mouseout', function() {
          //   infowindow.close(map, markersCafes[i]);
          // });

        }

        //delete last elem of each cafe - which is counted distance
        allCafes.forEach((elem , i) => {
            elem.splice(-1,1);
        });

      }

      //EVENTS
      if( $(".invisible").css("display") === "flex" ){
        $('html').on("keyup" , (event) => {
          if(event.keyCode == enter ){
            $(".invisible").css("display" , "none");

          }
        });

        $('.invisible').on('click' , (event) => {
          $(".invisible").css("display" , "none");
          findCafes();
        });
      }
      // ............................................

      $('html').on("keyup" , (event) => {
        if(event.keyCode == enter){
          findCafes();
        }
      });

      $('#find').on('click' , (event) => {
        findCafes();
      });

      // $('.title').on('click' , (event) => {
      //   onLoad();
      // });

      $('article').on("click" , function(event){
        event.preventDefault();
        // making markers bouncing when click to desc
        markersCafes.forEach((elem)=>{elem.setAnimation(null)});
        // I use this instead of event.target because this point to article and even.target can point to div with name and address - and it has no id
        markersCafes[this.id].setAnimation(google.maps.Animation.BOUNCE);
      });



    }

    async function start() {
      await second();

    }

    start()
