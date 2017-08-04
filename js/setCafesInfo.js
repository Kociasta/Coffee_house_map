import getHours from './hours.js';

let moduleSetCafesInfo = (function(allCafes) {

  let setHourAndMinutes = function (when , elem , myWidth) {
    let whenRound; // hours in decimal system

    if(when.length === 1 || when.length === 2 ){  // case: opening hours without minutes
      $(elem).css("width" , `${(parseInt( myWidth ,10)-6)*5}%`);
      $(elem).html(`<span>${when} <sup>00</sup> </span>`);
    } else{                                      // case: opening hours with minutes
      let min;
      if(when.length === 4){ // case 1-digit hour
        min = when[2] + when[3]; //return string made of 2 numbers e.g. from[2]=3, from[3]=0 -> min=30
        whenRound = parseInt(myWidth,10)+ parseInt((min),10)/60;
      } else if(when.length === 5) { // case 2-digits hour
        min = when[3] + when[4];
        whenRound = parseInt(myWidth,10)+ parseInt((min),10)/60;
      }
      // formula for setting stripe width : ( when - 6 )*5
      // total width of stripe .cafe-fours is 100% - it is split to 20 parts - 5% is 1 hour - starts from 5am - ends at 1am, 5% is for margins from left and right - so actual start hour is 6am and end - midnight
      //exmaple : when=9 , 9-6=3 , 3*5% = 15% - the .cafe-hours-from stripe has 15%width (+5% margins)

      $(elem).css("width" , `${(whenRound-6)*5}%`);
      $(elem).html(`<span>${parseInt(when,10)}<sup>${min}</sup></span>`); // parse only 1st number e.g. 7:30 -> 7
    }
  }

  let _setCafeInfo = function(allCafes){

    // set cafe name
    $(".cafe-name").each((i , elem) => {
        $(elem).text(allCafes[i][1].name);
    });
    // set cafe address
    $(".cafe-name").each((i , elem) => {
        $(elem).next().text(allCafes[i][1].adress);
    });

    // set opening hours (width of stripe + text)
    $(".cafe-hours-from").each((i , elem) => {

      if(getHours(allCafes[i]).from === "") { // if today is closed

        $(elem).html(`<span class="closed">ZAMKNIĘTE</span>`);
        $(elem).css("width" , `50%`);

      } else {                               // if it is open

        let from = getHours(allCafes[i]).from ; // 2 type of data in base -> "8" or "7:30"
        setHourAndMinutes(from , elem , from);

      }
    });

    //set close hours (width of stripe + text)
    $(".cafe-hours-to").each((i , elem) => {

      if(getHours(allCafes[i]).to === "") { // if cafe is closed

        $(elem).html(`<span> </span>`); // clearing previous elem
        $(elem).css("width" , `0`);

      } else {                              // if cafe is open

        let to = getHours(allCafes[i]).to;
        if(parseInt(to,10) < 16) { // case: cafe is open till late hours - e.g. 2 am

          setHourAndMinutes( to , elem , 24);

        } else{ // case: cafe is open "normal" and closed before mid.

          setHourAndMinutes(to , elem , to);

        }
      }

    });

    // set actual time on .cafe-hours stripe --> in scss class .hour
    $(".cafe-hours").each((i , elem)=>{

      let min = new Date().getMinutes(); // actual time - min
      let hour = new Date().getHours(); // actual time - hour

      let time = Math.round((hour + (min)/60)*1000)/1000;
      //example: hours=8 , min=30 -> time = 8.5 , *1000/1000 - 3 decimal  round

      if(time >= 5 && time <= 24){ // show time only form 5 to 24
        $(elem).find(".hour").css("left" , `${(time-6)*5+5}%`);
      }

    });


    // set description (icons)
    $(".cafe-icons").each((i , iconStripe) => {

      //all icons
      let icons = ["slice1.png","slice2.png","slice3.png","slice4.png","slice5.png"];
      let path = "./img/icons/";

      // get description from datebase
      let cafeIcons = allCafes[i][1].icons().split(" ");
      // clearing icon stripe
      $(iconStripe).html("");

      // running through array cafeIcons and checking what icons set
      $(cafeIcons).each((index , ico)=>{
        switch(ico) {
          case "[a]":
            $(iconStripe).append(`<img class="${ico}" src="${path+icons[0]}" alt="${ico}">`);
            break;
          case "[e]":
            $(iconStripe).append(`<img src='${path+icons[1]}' alt="${ico}">`);
            break;
          case "[fresh]":
            $(iconStripe).append(`<img src='${path+icons[2]}' alt="${ico}">`);
            break;
          case "[100%]":
            $(iconStripe).append(`<img src='${path+icons[3]}' alt="${ico}">`);
            break;
          case "[lokal]":
            $(iconStripe).append(`<img src='${path+icons[4]}' alt="${ico}">`);
            break;
        }
      });
    });



  } //_setCafeInfo()



  return {
    setCafesInfo: _setCafeInfo
  }

})();


export default moduleSetCafesInfo;
