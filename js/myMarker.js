
let moduleMyMarker = (function(){

  let _setMyMarker = function(latLng , map){
    map.setCenter(latLng);
    let marker = new google.maps.Marker({
        map: map,
        position: latLng,

        icon: 'img/icons/slice6.png',

    });

    return marker;
  }

  return {
    setMyMarker: _setMyMarker,
  }

})();

export default moduleMyMarker;
