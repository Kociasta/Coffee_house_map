//******************************************************************************
let moduleDistance = (function() {

  // function calculating a distance between myAddress and CafeAddress
  let _takeDistance = function(from, to) { // parameters are google.maps.LatLng objects
    let distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
    return (distance/1000) // return distance in km with 2 decimal places
  }

  return {
    takeDistance: _takeDistance
  }

})();

export default moduleDistance;


// --------------how to use ?
// import import moduleDistance from './distance.js';
// moduleDistance.takeDistance(myAddressLatLng , cafeAddressLatLng)