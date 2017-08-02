//******************************************************************************
let moduleCafeMarker = (function(){

  let _setMyMarker = function(latLng , map , name){

    let marker = new google.maps.Marker({
        map: map,
        position: {lat:latLng.lat() , lng: latLng.lng()} ,
        icon: 'img/icons/slice8.png',
        animation: google.maps.Animation.DROP,
        title: name
    });
    return marker;
  }

  return {
    setCafeMarker: _setMyMarker,
  }

})();

export default moduleCafeMarker;

// this module return marker and set it on latLng position -> moduleCafeMarker.setCafeMarker(latLng , map , name)
