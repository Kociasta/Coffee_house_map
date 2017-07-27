import getHours from './hours.js';

let moduleSetNameSetAddress = (function(allCafes) {



  let setNameAndAddress = function(allCafes){


    let from = parseInt(getHours(allCafes).from , 10);
    let to = parseInt(getHours(allCafes).to ,10);
    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).text(allCafes[i][1].name);
    });
    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).next().text(allCafes[i][1].adress);
    });

    // here - changing hours
    $(".cafe-hours").each((i , elem) => { // find elements with class cafe-name
        $(elem).css("width" , `${from*10}px`);
        console.log(`${from*10}px`);
    });
  }

  return {
    set: setNameAndAddress
  }

})();


export default moduleSetNameSetAddress;
