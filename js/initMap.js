
let moduleInitMap = (function() {
  let mapId = $('#map')[0]; // jQuery: return Object - I have to pull out div elem
  let _map;
  let _geocoder;

  let _initMap = function () {
    let centrum = {lat:  52.229676 , lng: 21.012229}; //my focus on start point
    _map = new google.maps.Map( mapId, { //create new map elem in #map
      zoom: 13,
      center: centrum
    });
    _geocoder = new google.maps.Geocoder() ;
    // console.log(_geocoder , _map);
  };

  let makeMap = function() {
    return _map;
  }

  let makeGeocoder = function() {
    return _geocoder;
  }

  return {
    initMap: _initMap,
    map: makeMap,
    geocoder: makeGeocoder
  }

})();

export default moduleInitMap;
