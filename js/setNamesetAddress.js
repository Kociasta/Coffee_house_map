let moduleSetNameSetAddress = (function(allCafes) {

  let setNameAndAddress = function(allCafes){

    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).text(allCafes[i][1].name);
    });
    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).next().text(allCafes[i][1].adress);
    });

  }

  return {
    set: setNameAndAddress
  }

})();


export default moduleSetNameSetAddress;
