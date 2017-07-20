import * as Firebase from 'firebase'; // my coffee places with detail info
let moduleFirebase = (function() {

    let param;
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

    // set text to name from firebase
    let _setName = function() {
      _db.on('value' , (snap) => {

        $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
            $(elem).text(snap.val()[i].name);
        });

      });
    };

     // set adresses from firebase (to the next elems)
    let _setAddress = function() {
      _db.on('value' , (snap) => {

        $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
          $(elem).next().text("ul. " + snap.val()[i].adress);
        });

      });
    };

    // set coffeeAddress on one of the firebase cafes address
    let _coffeeAddress =  function() {
      _db.on('value' , (snap) => {
          // console.log(snap.val()[2].geo[0]);
          param = {
            lat: function(){ return snap.val()[2].geo.lat},
            lng: function(){ return snap.val()[2].geo.lng},
          }

      });
      return param
    };


    return {
      setName: _setName,
      setAddress: _setAddress,
      coffeeAddress: _coffeeAddress,
    }

})();

export default moduleFirebase;
