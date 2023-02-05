const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
}))

// api url
const api_url = "https://raw.githubusercontent.com/stacc/future-of-fintech-V2023/main/data/consumption.json";

// Defining async function
async function getapi(url) {

  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  // console.log(data);
  // if (response) {
  //     hideloader();
  // }
  findConsumption(data);
  show(data);
}
// Calling that async function
getapi(api_url);

// used to find the most and least consumption during the whole periode of time
function findConsumption(data){
  var maxConsumption = data[0].consumption;
  for(i=0;i<data.length;i++){
    if(data[i].consumption>maxConsumption){
      maxConsumption=data[i].consumption;
    }
  }
  
  var minConsumption = data[0].consumption;
  for(j=0;j<data.length;j++){
    if(data[j].consumption<minConsumption){
      minConsumption = data[j].consumption;
    }
  }
}

// a helping function used to find the average of day by day consumation of electricity
function findAverage(array){
  var average=0;
  for(i=0;i<array.length;i++){
    average = average + array[i].consumption;
  }
  return average/24;
}

// a helping function that finds the y-values to the diagram
function yValues(data){
  var period=[];
  var array = [];
  let j = 0;
  for(let i=4; i<data.length-16; i++){
    period.push(data[i]);
    j++;
    if(j%24==0){
      average = findAverage(period);
      array.push(average);
      period = [];
    }
  }
  return array
}

// funtion to find all the dates, very alike to the yValues
function xValues(data){
  var dates=[];
  let j = 0;
  for(let i=4; i<data.length-16; i++){
    if(!dates.includes(data[i].from.slice(0,10))){
      dates.push(data[i].from.slice(0,10));
    }
  }
}

function show(data){
  const myPlot = document.querySelector("#myPlot");
  var xArray=xValues(data);
  var yArray=yValues(data);

  // Define Data
  var data1 = [{
    x: xArray,
    y: yArray,
    mode: "lines",
    type: "scatter"
  }];

  // Define Layout
  var layout = {
    xaxis: {range: [0, 19], title: "period: 18.12.22 to 06.01.23"},
    yaxis: {range: [0, 10], title: "electricity in kwH"},
    title: "Electricity usage"
  };
  Plotly.newPlot("myPlot", data1, layout);
}

