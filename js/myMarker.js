//*****************************************************************************
let moduleMyMarker = (function(){

  let _setMyMarker = function(latLng , map){

    // centre the map
    map.setCenter(latLng);

    // create my position marker
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

// this module set map centre at latLng and return marker of my position
