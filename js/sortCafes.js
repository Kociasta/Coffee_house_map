import moduleDistance from './distance.js';
import moduleFirebase from './fb.js';

let moduleSortCafes = (function(resultLatLng) {

  let _allCafes = moduleFirebase.coffeeAddress();
  
  let takeAllCafes = function(resultLatLng) {

    _allCafes.forEach((elem, i ) => {
      _allCafes[i].push(moduleDistance.takeDistance(resultLatLng , elem[0]));
    });

    _allCafes.sort(function(a, b){return a[2]-b[2]}); // sort order - 3rd elem - distance



    return _allCafes
  }

  return  {
    allCafes: takeAllCafes
  }

})();




export default moduleSortCafes;
