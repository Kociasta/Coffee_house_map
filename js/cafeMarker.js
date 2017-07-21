
let moduleCafeMarker = (function(){



  let _setMyMarker = function(latLng , map){

    let marker = new google.maps.Marker({
        map: map,
        position: {lat:latLng.lat() , lng: latLng.lng()}
    });

    return marker;
  }

  return {
    setCafeMarker: _setMyMarker,
  }

})();

export default moduleCafeMarker;
