//*****************************************************************************
import moduleDistance from './distance.js';
import moduleFirebase from './fb.js';

let moduleSortCafes = (function(resultLatLng) {

  // all important info from database
  let _allCafes = moduleFirebase.coffeeDB();

  // return SORTED database
  let _takeAllCafes = function(resultLatLng) {

    // push distance as third element of _allCafes
    _allCafes.forEach((elem, i ) => {
      _allCafes[i].push(moduleDistance.takeDistance(resultLatLng , elem[0]));
    });
    // sort array
    _allCafes.sort(function(a, b){return a[2]-b[2]}); // sort order -[2]- 3rd elem - distance

    return _allCafes
  }

  return  {
    sortedAllCafes: _takeAllCafes
  }

})();




export default moduleSortCafes;
