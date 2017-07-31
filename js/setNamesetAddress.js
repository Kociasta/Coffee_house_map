import getHours from './hours.js';

let moduleSetCafesInfo = (function(allCafes) {

  let setHourAndMinutes = function (when , elem , myWidth) {
    if(when.length === 1 || when.length === 2 ){
      $(elem).css("width" , `${(parseInt( myWidth ,10)-6)*5}%`);
      $(elem).html(`<span>${when} <sup>00</sup> </span>`);
    } else{
      let min;
      if(when.length === 4){ // case 1-digit hour
        min = when[2] + when[3]; //return string made of 2 numbers e.g. from[2]=3, from[3]=0 -> min=30
      } else if(when.length === 5) { // case 2-digits hour
        min = when[3] + when[4];
      }
      $(elem).css("width" , `${(parseInt(when,10)-6)*5}%`); // parse only 1st number e.g. 7:30 -> 7
      $(elem).html(`<span>${parseInt(when,10)}<sup>${min}</sup></span>`);
    }
  }

  let _setCafeInfo = function(allCafes){

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

        setHourAndMinutes(from , elem , from);

      }
    });

    $(".cafe-hours-to").each((i , elem) => { // find elements with class cafe-hours-to

      if(getHours(allCafes[i]).to === "") { // if cafe is closed

        $(elem).html(`<span> </span>`); // clearing previous elem
        $(elem).css("width" , `0`);

      } else {                              // if cafe is open

        let to = getHours(allCafes[i]).to;

        if(parseInt(to,10) < 16) { // case: cafe is open till late hours - e.g. 2 am

          setHourAndMinutes(to , elem , 24);

        } else{ // case: cafe is open "normal" and closed before mid.

          setHourAndMinutes(to , elem , to);

        }
      }

    });

  }



  return {
    setCafesInfo: _setCafeInfo
  }

})();


export default moduleSetCafesInfo;
