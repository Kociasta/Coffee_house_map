
let moduleCafeMarker = (function(){



  let _setMyMarker = function(latLng , map){

    let marker = new google.maps.Marker({
        map: map,
        position: {lat:latLng.lat() , lng: latLng.lng()} ,
        // icon: 'img/kociasta_ico.png',
        animation: google.maps.Animation.DROP,
    });

    return marker;
  }

  return {
    setCafeMarker: _setMyMarker,
  }

})();

export default moduleCafeMarker;
