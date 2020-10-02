//input field watcher function
var rowCount, columnCount, rangeMin, rangeMax;
function listeners () {
  //Table Styling : row count and column count
  rowCount = document.querySelector("#row").value*1;
  columnCount = document.querySelector("#column").value*1;
  //Array Creation(array of possible values)
  rangeMin = document.querySelector("#range-min").value*1;
  rangeMax = document.querySelector("#range-max").value*1;
  interval = document.querySelector("#interval").value*1;
}
//watch changes to the input field every 200ms
setInterval(listeners, 200);
//submit button and the result container
const resultDir = document.querySelector(".table");
const submitButton = document.querySelector("#submit");

//first, create an array from rangeMin to rangeMax.
function createArray (rangeMin, rangeMax, interval) {
  let array = [];
  for (let i = 0; i <= (rangeMax-rangeMin)/interval; i++) {
    array[i] = rangeMin + i*interval;
  }
  return array;
}
//next, we pick one element from these possible
//values, put it somewhere(in the table), and
//then remove this element from the array.
function pickOneRandomly (array) {
  let randomIndex = Math.floor(Math.random() * (array.length));
  let pickedElement = array[randomIndex];
  array.splice(randomIndex, 1);
  let output = [pickedElement, array];
  return output;
}
//write the picked elements one-by-one on the html
function buildTable () {
  //Clears the output field
  resultDir.innerHTML = "";
  //CSS Variable manipulation
  let divider = "";
  for (let k = 0;k < columnCount ;k++) {
    divider = divider.concat("1fr ");
  }
  document.documentElement.style.setProperty(
    "--divider", `${divider}`
  );
  //create the neccessary 
  //spit out randomly chosen element into the html
  let initialArray = createArray(rangeMin, rangeMax, interval);
  let currentArray = initialArray;
  let nodeToAppend, nodeValue;
  for (let a = 0; a < columnCount; a++) {
    nodeToAppend = document.createElement("li");
    nodeValue = `G${a+1}`;
    nodeToAppend.append(nodeValue);
    nodeToAppend.classList.add("group");
    resultDir.append(nodeToAppend);
  }
  for (let j = 0; (j < rowCount*columnCount); j++) {
    currentArray = pickOneRandomly(currentArray);
    nodeToAppend = document.createElement("li");
    nodeValue = currentArray[0];
    //debugging for when the amount of possible
    //value is less than rowCount*columnCount
    if (nodeValue == undefined) {
      break;
    }
    nodeToAppend.append(nodeValue);
    resultDir.append(nodeToAppend);
    currentArray = currentArray[1];
  }
}

submitButton.addEventListener("click", buildTable, false);