import * as Firebase from 'firebase'; // my coffee places with detail info
import moduleCafeMarker from './cafeMarker.js';

let moduleFirebase = (function() {

    let _param = [];
    // variable with config data to get to Firebase
    const _config = {
        apiKey: "AIzaSyA0PL06i_Fdi70FkUxOo4I9JToVS-632U8",
        authDomain: "my-awesome-coffee.firebaseapp.com",
        databaseURL: "https://my-awesome-coffee.firebaseio.com",
        projectId: "my-awesome-coffee",
        storageBucket: "my-awesome-coffee.appspot.com",
        messagingSenderId: "58575921422"
      };

    // getting info from database
    let _fb = Firebase.initializeApp(_config);
    let _db = _fb.database().ref();

    // set .cafe-name to name from firebase, set addresses from firebase (to the next elems), create and close markers
    let _setIntroName = function(map) {
      _db.on('value' , (snap) => {

        //every load of page the number "random" is generated
        //4 cafes are semi-random because 1-st of them is really random and others are its neighbours (in database)
        //e.g. random = 4 , cafes that appear on page are 4,5,6 and 7 position from database

        let random = Math.round(Math.random()*(snap.val().length-4)); // -4 -> because of 4 cafes
        let markers =[];
        // set markers
        $(".cafe-name").each((i , elem) => {
            // making  object latLng
            let latLng = {
                lat : function() {return snap.val()[random+i].geo.lat},
                lng : function() {return snap.val()[random+i].geo.lng}
            }

            let name = snap.val()[random+i].name;
            let address = snap.val()[random+i].adress;

            // set cafe-name
            $(elem).text(name);
            // create markers
            markers.push(moduleCafeMarker.setCafeMarker(latLng , map , name));
            //set cafe-address
            $(elem).next().text("ul. " + address);

            //EVENTS - to close markers
            $('.invisible').on('click' , (event) => {
                for(let i = 0 ; i<4 ; i++){
                  markers[i].setMap(null);
                }
            });
            $('html').on("keyup" , (event) => {
              if(event.keyCode === 13){
                for(let i = 0 ; i<4 ; i++){
                  markers[i].setMap(null);
                }
              }
            });
        });

      });
    };

    // set coffeeDB on one of the firebase cafes address
    let _coffeeDB =  function() {
      _db.on('value' , (snap) => {

          for(let i=0 ; i<snap.val().length ; i++){
              _param.push( [{
                            lat: function(){ return snap.val()[i].geo.lat},
                            lng: function(){ return snap.val()[i].geo.lng},
                          },
                          {
                            name: function(){ return snap.val()[i].name},
                            adress: function(){ return snap.val()[i].adress},
                            hours: function(){ return snap.val()[i].hours},
                            icons: function(){return snap.val()[i].desc},
                          },
                        ]
              )
          }

      });
      return _param // structure: [ [{lat() , lng()}, {name() , adress(), hours(), desc()}] , [{},{}] , [{},{}] , ...  ] - if I want get to adress -> moduleFirebase.coffeeDB()[1][1].adress()
    };


    return {
      setIntroName: _setIntroName,
      coffeeDB: _coffeeDB,
    }

})();

export default moduleFirebase;
