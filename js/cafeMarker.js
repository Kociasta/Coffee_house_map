
let moduleCafeMarker = (function(){

  // let infowindow = new google.maps.InfoWindow();

  let _setMyMarker = function(latLng , map , name){

    let marker = new google.maps.Marker({
        map: map,
        position: {lat:latLng.lat() , lng: latLng.lng()} ,
        // icon: 'img/kociasta_ico.png',
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
