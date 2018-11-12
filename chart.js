const totals = [];
function fixSpending(arr) {
  for (let x = 0; x < arr.length; x++) {
    let spending = arr[x]['Spending'];
    spending = spending.substr(1,);
    spending = spending.replace(',', '');
    arr[x]['Spending'] = spending;
  }
}

// Building better Array of objects
function categorize(months) {
  let result = [];
  for (let month in months) {
    let obj = {}

    for (let x = 0; x < months[month].length; x++){

      let category = months[month][x]['Category'];
      let spending = months[month][x]['Spending'];
      //console.log(spending + category);
      //let objectBuilder = '"' + months[month][cat]['Category'] + '": ' + months[month][cat]['Spending'];
      obj[category] = spending;
      //console.log(obj);
    }
    result.push(obj);

  }
  return result;
}

// Sort labels alphabetically
function sortLabels(arr) {

  /*
  console.log(Object.keys(arr));
  Object.keys(arr)
        .sort()
        .forEach(function(v, i) {
            console.log(v, arr[v]);
         });
*/
  //console.log(arr);




}



/** Start doughnut */
const chartColors = [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 229, 35, 0.2)',
              'rgba(184, 1, 115, 0.2)',
              'rgba(246, 151, 54, 0.2)',
              'rgba(97, 125, 231, 0.2)',
              'rgba(205, 109, 202, 0.2)',
              'rgba(40, 2, 127, 0.2)',
              'rgba(135, 236, 217, 0.2)',
              'rgba(69, 179, 193, 0.2)'
            ];
const chartBorders = [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 229, 35, 1)',
              'rgba(184, 1, 115, 1)',
              'rgba(246, 151, 54, 1)',
              'rgba(97, 125, 231, 1)',
              'rgba(205, 109, 202, 1)',
              'rgba(40, 2, 127, 1)',
              'rgba(135, 236, 217, 1)',
              'rgba(69, 179, 193, 1)'
            ];

const months = [];

const june = [
  {Category: "Home", Spending: "$1,875.00"},
  {Category: "Food & Dining", Spending: "$1,159.44"},
  {Category: "Auto & Transport", Spending: "$257.49"},
  {Category: "Shopping", Spending: "$210.71"},
  {Category: "Education", Spending: "$210.11"},
  {Category: "Fees & Charges", Spending: "$115.69"},
  {Category: "Uncategorized", Spending: "$100.00"},
  {Category: "Entertainment", Spending: "$84.80"},
  {Category: "Business Services", Spending: "$59.95"},
  {Category: "Pets", Spending: "$15.55"},
  {Category: "Health & Fitness", Spending: "$10.00"},
  {Category: "Total", Spending: "$4,098.74"},
];

const july = [
  {Category: "Home", Spending: "$1,875.00"},
  {Category: "Food & Dining", Spending: "$1,073.63"},
  {Category: "Travel", Spending: "$331.77"},
  {Category: "Shopping", Spending: "$277.20"},
  {Category: "Entertainment", Spending: "$240.03"},
  {Category: "Education", Spending: "$238.11"},
  {Category: "Auto & Transport", Spending: "$234.66"},
  {Category: "Fees & Charges", Spending: "$130.27"},
  {Category: "Uncategorized", Spending: "$60.00"},
  {Category: "Financial", Spending: "$46.63"},
  {Category: "Business Services", Spending: "$41.67"},
  {Category: "Health & Fitness", Spending: "$8.40"},
  {Category: "Total", Spending: "$4,557.37"}
];

const august = [
  {Category: "Home", Spending: "$2,228.18"},
  {Category: "Food & Dining", Spending: "$596.61"},
  {Category: "Auto & Transport", Spending: "$233.33"},
  {Category: "Education", Spending: "$210.11"},
  {Category: "Travel", Spending: "$170.08"},
  {Category: "Fees & Charges", Spending: "$141.90"},
  {Category: "Uncategorized", Spending: "$120.00"},
  {Category: "Shopping", Spending: "$103.99"},
  {Category: "Entertainment", Spending: "$96.98"},
  {Category: "Health & Fitness", Spending: "$42.94"},
  {Category: "Business Services", Spending: "$39.91"},
  {Category: "Bills & Utilities", Spending: "$31.95"},
  {Category: "Total", Spending: "$4,015.98"}
];

const september = [
  {Category: "Uncategorized", Spending: "$2185.00"},
  {Category: "Home", Spending: "$1100.00"},
  {Category: "Food & Dining", Spending: "$852.02"},
  {Category: "Auto & Transport", Spending: "$571.58"},
  {Category: "Education", Spending: "$210.11"},
  {Category: "Shopping", Spending: "$194.59"},
  {Category: "Entertainment", Spending: "$159.94"},
  {Category: "Fees & Charges", Spending: "$116.52"},
  {Category: "Bills & Utilities", Spending: "$31.95"},
  {Category: "Business Services", Spending: "$14.00"},
  {Category: "Total", Spending: "$5435.71"}
];

const october = [
  {Category: "Home", Spending: "$1413.75"},
  {Category: "Food & Dining", Spending: "$1088.75"},
  {Category: "Shopping", Spending: "$349.49"},
  {Category: "Auto & Transport", Spending: "$226.49"},
  {Category: "Education", Spending: "$210.11"},
  {Category: "Fees & Charges", Spending: "$116.73"},
  {Category: "Health & Fitness", Spending: "$113.38"},
  {Category: "Entertainment", Spending: "$89.00"},
  {Category: "Uncategorized", Spending: "$73.74"},
  {Category: "Bills & Utilities", Spending: "$56.95"},
  {Category: "Personal Care", Spending: "$28.50"},
  {Category: "Business Services", Spending: "$11.10"},
  {Category: "Total", Spending: "$3777.99"}
];

// Refector to make months into array?
months["june"] = june;
months["july"] = july;
months["august"] = august;
months["september"] = september;
months["october"] = october;


// Map arrow function to apply fixSpending()
for (let key in months) {
  fixSpending(months[key]);
}

// Setup months by {category: spending,} pairs
let spendingPairs = categorize(months);
console.log(spendingPairs);
sortLabels(months);

// Build #categoryDropdown
function buildDropdown(arr) {
  // Loop through array for Object.keys
  for (let x = 0; x < arr.length; x++) {
  //  console.log(Object.keys(arr[x]));
  }
  //console.log(arr);
}
//buildDropdown(spendingPairs);



// Splits all months by categories
function makeCategories(arr, chartObj, chart){
  console.log(arr.length, totals.length);
  const categories = [];
  let $selected = $('#categoryDropdown').val();
  console.log(!$('#categoryDropdown').val());
  if (!$selected) {
    $selected = 'Total';
  };
  if (totals.length === arr.length && $selected === 'Total') {
    categories.push(...totals);
  }
  else {
    for (let x = 0; x < arr.length; x++) {

      let {['Auto & Transport']: transportation} = arr[x];
      let {['Business Services']: business} = arr[x];
      let {Education: education} = arr[x];
      let {Entertainment: entertainment} = arr[x];
      let {['Fees & Charges']: fees} = arr[x];
      let {Financial: financial} = arr[x];
      let {['Food & Dining']: food} = arr[x];
      let {['Health & Fitness']: fitness} = arr[x];
      let {Home: home} = arr[x]
      let {Shopping: shopping} = arr[x]
      let {Total: total} = arr[x]
      let {Uncategorized: uncategorized} = arr[x]

      //const {['$selected']} = arr[x];

      if ($selected === 'Total' && totals.length !== arr.length) {
        console.log(total);
        totals.push(Number(total));
      } else if ($selected === 'Total') {
        categories.push(...totals);
        return;
      }
      console.log(arr[x][$selected]);
      categories.push(Number(arr[x][$selected]));

    //  console.log(home, food, transportation, education, uncategorized, total);
    }
  }
  console.log(categories);

  //lineChartData['datasets']['data'].push(categories);
  chartObj.labels = Object.keys(months);

  // programmatically get label (category) -> use html dropdown
  chartObj.datasets[0].label = $selected;
  chartObj.datasets[0].data = categories;

  chart.update();

}

// TO-DO

// chart[data][datasets] should be created programmatically to allow for n months

// Chart[label] should be array name (month name)

// Allow option to render multiple charts

// Function to properly format .csv info directly from Mint


// Chart defaults
// these are some defaults you can use for customizing your charts
/*
Chart.defaults.global.responsive = true;
Chart.defaults.global.animationSteps = 50;
Chart.defaults.global.tooltipYPadding = 16;
Chart.defaults.global.tooltipCornerRadius = 0;
Chart.defaults.global.tooltipTitleFontStyle = "normal";
Chart.defaults.global.tooltipFillColor = "white";
Chart.defaults.global.animationEasing = "easeOutBounce";
Chart.defaults.global.scaleLineColor = "black";
Chart.defaults.global.scaleFontSize = 16;
Chart.defaults.global.showScale = false;
Chart.defaults.global.pointDotStrokeWidth = 2;
//Chart.defaults.global.title.legend = 'test';
Chart.defaults.global.labelString = 'test';
*/


/** Line chart attempt */
//this is data for the line charts

var lineChartData = {
  // This will be full of months
  datasets: [{
    //fillColor: "#560620",
    strokeColor: "blue",
    strokeLineWidth: 18,
    pointColor: "white",
    // Map through all data to find matching categories for label
    label: 'default',
    backgroundColor: 'transparent',
    borderColor: 'lightblue',

    // mapped data
    //data: [20, 90, 140, 25, 53, 67, 47, 98, 30, 80, 20, 40, 10, 60],
  }]
};



// then i just duplicated the chart specific options
var cty = document.getElementById("lineChart").getContext("2d");
var lineChartDemo = new Chart(cty, {
  type: 'line',
  label: 'test',
  data: lineChartData,
  pointDotRadius: 3,
  bezierCurve: true,
  datasetFill: false,
  datasetStroke: true,
  scaleShowVerticalLines: false,
  scaleShowHorizontalLines: false,
  pointDotStrokeWidth: 4,
  //fillColor: "rgba(220,220,220,0.2)",
  scaleGridLineColor: "blue",
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }

});
makeCategories(spendingPairs, lineChartData, lineChartDemo);


/** Start doughnut */

//console.log(september);

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: []
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
buildLabels(myChart, spendingPairs);



function buildLabels(chart, arr) {
  const labels = [];
  console.log(arr);
  for (let x = 0; x < arr.length; x++) {
    // Sort labels
    //console.log(x, arr[x]);

    // Loop through object to add to labels
    for (key in arr[x]){
      //console.log(key);
      if (key === undefined) {
        //console.log(key);
      }

      if (labels.indexOf(key) === -1 && key !== 'Total') {
        labels.push(key);
      }
    }



  }
  // Sort labels alphabetically
  labels.sort();



/** Old label builder
  for (let key in months) {

    //console.log(months[key]);
    const current = months[key];
    for (let x in current) {
      //console.log(current[x]['Category']);
      if (current[x]['Category'] === undefined) {
        console.log(current[x]);
      }

      if (labels.indexOf(current[x]['Category']) === -1 && current[x]['Category'] !== 'Total') {
        labels.push(current[x]['Category']);
      }
    }
  }
  // Sort function
  //months[key].sort((a,b) => (a.Category > b.Category) ? 1 : ((b.Category > a.Category) ? -1 : 0));
  //console.log(months[key]);
  //console.log(labels);
  labels.sort();
  //console.log(labels);
*/


  // Generate labels for lineChart input
  $('#categoryDropdown').append('<option value="Total">Total</option>');
  for (let i = 0; i < labels.length; i++){
    $('#categoryDropdown').append(`<option value="${labels[i]}">${labels[i]}</option>`);
  }
  myChart['data']['labels'] = labels;
  chart.update();
}

// change function for option values (dropdown)
$('#categoryDropdown').change(function(){
  makeCategories(spendingPairs, lineChartData, lineChartDemo);
});




// Build function for all months
function compileData(chart, arr) {
  const labels = chart['data']['labels'];
  let num = 0;
  //console.log(labels);
  //console.log(arr);



  // Loop through labels
  for (let i = 0; i < arr.length; i++) {
    delete arr[i]['Total'];
    console.log(arr[i]);

    //console.log(labels);
    // If object key doesn't exist
      // push key: 0 pair
      // Loop through labels
    let match = false;

    // loop through months[key]
      console.log();
      for (let x = 0; x < labels.length; x++) {
        // If labels[x] not in object.keys
        if (Object.keys(arr[i]).indexOf(labels[x]) === -1) {
          arr[i][labels[x]] = 0;
        }
/*
      let currentCategory = arr[key][i]['Category'];
      if (currentCategory === labels[x]) {
        match = true;
      }
      */
    }
/*
    if (!match) {
      arr[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
    }
*/
  }
  //console.log(arr);



  const orderedArray = [];
  // loop through arr
  for (let x = 0; x < arr.length; x++) {
    // sort arr[x] by key
    //console.log(arr[x]);
    let obj = {};

    Object.keys(arr[x])
      .sort()
      .forEach(function(v, i) {
          //console.log(v, arr[x][v]);
          let spending = arr[x][v];
          obj[v] = spending;

       });
       //console.log(obj);
       orderedArray.push(obj);
       //orderedArray.push(obj[v]);

       //arr[x].sort((a,b) => (a.Category > b.Category) ? 1 : ((b.Category > a.Category) ? -1 : 0));

     //console.log(arr[x]);
     //orderedArray.push(arr[x]);
     //console.log(orderedArray);
  }
  //console.log(Object.keys(orderedArray[0]));

  // Loop through arr to create data
  for (let x = 0; x < orderedArray.length; x++) {
    //console.log(orderedArray[x][key]);
  //



    console.log(Object.values(orderedArray[x]));
    // Turn arr.values into Numbers
    let numbers = Object.values(orderedArray[x]);
/*
    // Loop through labels
    for (let x = 0; x < labels.length; x++) {
      let match = false;

      // loop through months[key]
      for (let i = 0; i < arr[key].length; i++) {
        let currentCategory = arr[key][i]['Category'];
        if (currentCategory === labels[x]) {
          match = true;
        }
      }
      if (!match) {
        arr[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
      }

    }
*/
    delete orderedArray[x]['Total'];

    const data = numbers.map(x => Number(x));

    console.log(Object.keys(orderedArray[x]));
    //const data = [];
    //data.push();

    console.log(data);

    dataObject = {};
    dataObject['data'] = data;
    dataObject['label'] = key;
    dataObject['backgroundColor'] = chartColors;
    dataObject['borderColor'] = chartBorders;
    dataObject['borderWidth'] = 1;

    myChart['data']['datasets'].push(dataObject);


  }



  /** Old Loop
  for (let key in arr) {

    //console.log(months[key]);
    const data = [];

    // Loop through labels
    for (let x = 0; x < labels.length; x++) {
      let match = false;

      // loop through months[key]
      for (let i = 0; i < arr[key].length; i++) {
        let currentCategory = arr[key][i]['Category'];
        if (currentCategory === labels[x]) {
          match = true;
        }
      }
      if (!match) {
        arr[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
      }

    }

    const current = months[key];

    for (let x in current) {
      //console.log(current[x]);

      if (current[x]['Category'] !== "Total"){
        //console.log(current[x]);
        data.push(Number(current[x]['Spending']));
      }
    }

    // Push this to myChart['data']['datasets']
      // Build Object, push to myChart['data']['datasets']
    /*           myChart['data']['datasets'][num]['data'] = data;
              myChart['data']['datasets'][num]['label'] = key;
              myChart['data']['datasets'][num]['backgroundColor'] = chartColors;
              myChart['data']['datasets'][num]['borderColor'] = chartBorders;


    dataObject = {};
    dataObject['data'] = data;
    dataObject['label'] = key;
    dataObject['backgroundColor'] = chartColors;
    dataObject['borderColor'] = chartBorders;
    dataObject['borderWidth'] = 1;



    //console.log(myChart['data']);

    num++;

  } */

  chart.update();
}
compileData(myChart, spendingPairs);
console.log(myChart['data']);




// Functions
