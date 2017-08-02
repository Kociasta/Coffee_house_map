//******************************************************************************
let moduleInitMap = (function() {

  let _mapId = $('#map')[0]; // jQuery: return Object - I have to pull out div elem
  let _map;
  let _geocoder;

  let _initMap = function () {
    let centrum = {lat:  52.229676 , lng: 21.012229}; //my focus on start point
    _map = new google.maps.Map( _mapId, { //create new map elem in #map
      zoom: 14,
      center: centrum
    });
    _geocoder = new google.maps.Geocoder() ;
  };

  let _makeMap = function() {
    return _map;
  }

  let _makeGeocoder = function() {
    return _geocoder;
  }

  return {
    initMap: _initMap,
    map: _makeMap,
    geocoder: _makeGeocoder
  }

})();

export default moduleInitMap;
