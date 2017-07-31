import * as Firebase from 'firebase'; // my coffee places with detail info
import moduleCafeMarker from './cafeMarker.js';

let moduleFirebase = (function() {

    let param = [];
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

    // set text to name from firebase set adresses from firebase (to the next elems)
    let _setName = function(map) {
      _db.on('value' , (snap) => {

        let _random = Math.round(Math.random()*(snap.val().length-4));
        let markers =[];
        $(".cafe-name").each((i , elem) => { // find elements with class cafe-name

            $(elem).text(snap.val()[_random+i].name);

            let latLng = {
                lat : function() {return snap.val()[_random+i].geo.lat},
                lng : function() {return snap.val()[_random+i].geo.lng}
            }

            let name = snap.val()[_random+i].name;

            markers.push(moduleCafeMarker.setCafeMarker(latLng , map , name));

            $('#find').on('click' , (event) => {
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

        $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
          $(elem).next().text("ul. " + snap.val()[_random+i].adress);
          // console.log(_random);
        });

      });
    };

    // set coffeeAddress on one of the firebase cafes address
    let _coffeeAddress =  function() {
      _db.on('value' , (snap) => {

          for(let i=0 ; i<snap.val().length ; i++){
              param.push( [{
                            lat: function(){ return snap.val()[i].geo.lat},
                            lng: function(){ return snap.val()[i].geo.lng},
                          },
                          {
                            name: function(){ return snap.val()[i].name},
                            adress: function(){ return snap.val()[i].adress},
                            hours: function(){ return snap.val()[i].hours}
                          },
                        ]
              )
          }

      });
      return param // structure: [ [{lat() , lng()},{name() , adress()}] , [{},{}] , [{},{}] , ...  ] - if I want get to adress -> moduleFirebase.coffeeAddress()[1][1].adress()
    };


    return {
      setName: _setName,
      coffeeAddress: _coffeeAddress,
    }

})();

export default moduleFirebase;
