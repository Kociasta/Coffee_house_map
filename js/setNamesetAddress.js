import getHours from './hours.js';

let moduleSetNameSetAddress = (function(allCafes) {

  let _setNameAndAddress = function(allCafes){

    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).text(allCafes[i][1].name);
    });
    $(".cafe-name").each((i , elem) => { // find elements with class cafe-name
        $(elem).next().text(allCafes[i][1].adress);
    });

    // here - changing hours
    $(".cafe-hours-from").each((i , elem) => { // find elements with class cafe-hours-from

      if(getHours(allCafes[i]).from === "") { // if this day cafe is closed

        $(elem).html(`<span class="closed">ZAMKNIĘTE</span>`);
        $(elem).css("width" , `50%`);

      } else {                               // if it is open

        let from = getHours(allCafes[i]).from ; // 2 type of data in base -> "8" or "7:30"

        if(from.length === 1 ){
          $(elem).css("width" , `${(parseInt(from,10)-6)*5}%`);
          $(elem).html(`<span>${from}<sup>00</sup></span>`);

        } else {
          let min = from[2] + from[3]; //return string made of 2 numbers e.g. from[2]=3, from[3]=0 -> min=30
          $(elem).css("width" , `${(parseInt(from,10)-6)*5}%`); // parse only 1st number e.g. 7:30 -> 7
          $(elem).html(`<span>${parseInt(from,10)}<sup>${min}</sup></span>`);
        }

      }
    });

    $(".cafe-hours-to").each((i , elem) => { // find elements with class cafe-hours-to

      if(getHours(allCafes[i]).to === "") { // if cafe is close

        $(elem).html(`<span> </span>`); // clearing previous elem
        $(elem).css("width" , `0`);

      } else {                              // if cafe i open

        let to = getHours(allCafes[i]).to;

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
    set: _setNameAndAddress
  }

})();


export default moduleSetNameSetAddress;
