// function which returns opening hours of chosen cafe in actual day of week (obj. new Date() return "today")

let getHours = function(allCafes){
  // actually allCafes = allCafes[i]

  switch(new Date().getDay()) {
      case 1:
        return allCafes[1].hours().mon;
        break
      case 2:
        return allCafes[1].hours().tue;
        break
      case 3:
        return allCafes[1].hours().wed;
        break
      case 4:
        return allCafes[1].hours().thu;
        break
      case 5:
        return allCafes[1].hours().fri;
      case 6:
        return allCafes[1].hours().sat;
        break
      case 0:
        return allCafes[1].hours().sun;
        break
  }

}


export default getHours;
