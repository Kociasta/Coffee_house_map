let moduleGeocodeMyAddress = (
  function() {

    let _myAddressLatLng;

    let _geocodeAddress =  function(geocoder , map , address , callback) {
        geocoder.geocode({'address': `${address} , Warszawa`}, function(results, status) {
          if (status === 'OK') {

            _myAddressLatLng = results[0].geometry.location;
            callback(_myAddressLatLng)

          }else {
            alert('Geocode was not successful for the following reason: ' + status);
          }

        });
    }

    return {
      geocodeAddress:  _geocodeAddress, // I take lat and lng of my address

    }

  }
)();

export default moduleGeocodeMyAddress;

// --------------how to use ?
// import import moduleGeocodeMyAddress from './geocodeMyAddress.js';
// moduleGeocodeMyAddress.myAddressLatLng(geocoder , map , address)
