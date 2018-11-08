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
months["july"] = july;
months["august"] = august;
months["september"] = september;
months["october"] = october;


// Map arrow function to apply fixSpending()
for (let key in months) {

  fixSpending(months[key]);
}


// TO-DO

// chart[data][datasets] should be created programmatically to allow for n months

// Chart[label] should be array name (month name)

// Allow option to render multiple charts

// Function to properly format .csv info directly from Mint


// Chart defaults
// these are some defaults you can use for customizing your charts

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



/** Line chart attempt */
//this is data for the line charts

var lineChartData = {
  // This will be full of months
  labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6", "Data 7", "Data 7", "Data 7", "Data 7", "Data 5", "Data 2", "Data 4", "Data 1"],
  datasets: [{
    fillColor: "#560620",
    strokeColor: "white",
    strokeLineWidth: 18,
    pointColor: "white",
    // Map through all data to find matching categories for label
    label: 'default',
    // mapped data
    data: [20, 90, 140, 25, 53, 67, 47, 98, 30, 80, 20, 40, 10, 60],
  }]
};
// then i just duplicated the chart specific options
var cty = document.getElementById("lineChart").getContext("2d");
var LineChartDemo = new Chart(cty, {
  type: 'line',
  label: 'test',
  data: lineChartData,
  pointDotRadius: 3,
  bezierCurve: true,
  datasetFill: true,
  datasetStroke: true,
  scaleShowVerticalLines: false,
  scaleShowHorizontalLines: false,
  pointDotStrokeWidth: 4,
  fillColor: "rgba(220,220,220,0.2)",
  scaleGridLineColor: "black",
});


const categoryBreakdown = [];



// Building better Array of objects
function categorize(months) {
  let result = [];
  for (let month in months) {
    let obj = {}

    for (let x = 0; x < months[month].length; x++){

      let category = months[month][x]['Category'];
      let spending = months[month][x]['Spending']
      //console.log(spending + category);
      //let objectBuilder = '"' + months[month][cat]['Category'] + '": ' + months[month][cat]['Spending'];
      obj[category] = spending;
      //console.log(obj);
    }
    result.push(obj);

  }
  return result;
}
categorize(months);
//console.log(categoryBreakdown);



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


function buildLabels(chart) {

  let num = 0;
  const labels = [];

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


  myChart['data']['labels'] = labels;
  chart.update();
}
buildLabels(myChart);




// Build function for all months
function compileData(chart) {
  const labels = chart['data']['labels'];
  let num = 0;
  for (let key in months) {

    // Sort function
    months[key].sort((a,b) => (a.Category > b.Category) ? 1 : ((b.Category > a.Category) ? -1 : 0));

    //console.log(months[key]);
    const data = [];

    // Loop through labels
    for (let x = 0; x < labels.length; x++) {
      let match = false;

      // loop through months[key]
      for (let i = 0; i < months[key].length; i++) {
        let currentCategory = months[key][i]['Category'];
        if (currentCategory === labels[x]) {
          match = true;
        }
      }
      if (!match) {
        months[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
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
              */

    dataObject = {};
    dataObject['data'] = data;
    dataObject['label'] = key;
    dataObject['backgroundColor'] = chartColors;
    dataObject['borderColor'] = chartBorders;
    dataObject['borderWidth'] = 1;



    myChart['data']['datasets'].push(dataObject);
    //console.log(myChart['data']);

    num++;

  }

  chart.update();
}
compileData(myChart);
console.log(myChart['data']);


let proper = categorize(months);
console.log(proper);


// Functions

function fixSpending(arr) {
  for (let x = 0; x < arr.length; x++) {
    let spending = arr[x]['Spending'];
    spending = spending.substr(1,);
    spending = spending.replace(',', '');
    arr[x]['Spending'] = spending;
  }
}
