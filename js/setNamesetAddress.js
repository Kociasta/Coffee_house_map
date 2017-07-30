import getHours from './hours.js';

let moduleSetNameSetAddress = (function(allCafes) {



  let setNameAndAddress = function(allCafes){




    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).text(allCafes[i][1].name);
    });
    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).next().text(allCafes[i][1].adress);
    });

    // here - changing hours
    $(".cafe-hours-from").each((i , elem) => { // find elements with class cafe-name

      if(getHours(allCafes[i]).from === "") {
        $(elem).html(`<span class="closed">ZAMKNIĘTE</span>`);
        $(elem).css("width" , `50%`);

      } else {
        var from = parseInt(getHours(allCafes[i]).from , 10);

        $(elem).css("width" , `${(from-6)*5}%`);
        // $(elem).text(getHours(allCafes[i]).from);
        $(elem).html(`<span>${from}:00</span>`);
        // console.log(getHours(allCafes[i]).from);
      }


    });
    $(".cafe-hours-to").each((i , elem) => { // find elements with class cafe-name
      if(getHours(allCafes[i]).to === "") {
        $(elem).html(`<span> </span>`);
        $(elem).css("width" , `0`);
      } else {
        let to = parseInt(getHours(allCafes[i]).to ,10);
        if(to < 16) {
          $(elem).css("width" , `${(24-6)*5}%`);

          $(elem).html(`<span>${to}:00</span>`);
        } else{
          $(elem).css("width" , `${(to-6)*5}%`);

          $(elem).html(`<span>${to}:00</span>`);
        }
        // console.log(to);
      }


    });
  }

  return {
    set: setNameAndAddress
  }

})();


export default moduleSetNameSetAddress;
