let getHours = function(allCafes){

let day = ""

switch(new Date().getDay()) {
    case 1:
      day = "mon";
      return allCafes[0][1].hours().mon;
      break
    case 2:
      day = "tue";
      return allCafes[0][1].hours().tue;
      break
    case 3:
      day = "wed";
      return allCafes[0][1].hours().wed;
      break
    case 4:
      day = "thu";
      return allCafes[0][1].hours().thu;
      break
    case 5:
      day = "fri";
      return allCafes[0][1].hours().fri;
      break
    case 6:
      day = "sat";
      return allCafes[0][1].hours().sat;
      break
    case 0:
      day = "sun";
      return allCafes[0][1].hours().sun;
      break
}




}


export default getHours;
