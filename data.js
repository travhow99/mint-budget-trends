const months = [];
const spendingLabels = [];
const spendingTotals = {};


const january = [];
const february = [];
const march = [];
const april = [];
const may = [];
const june = [];
const july = [];
const august = [];
const september = [];
const october = [];

// Refector to make months into array?
months["january"] = january;
months["february"] = february;
months["march"] = march;
months["april"] = april;
months["may"] = may;
months["june"] = june;
months["july"] = july;
months["august"] = august;
months["september"] = september;
months["october"] = october;

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
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
      }
  }

});



async function gatherData(arr) {
  return new Promise(function(resolve, reject) {


    let counter = 0;
    // Loop through months to populate months with all data
    for (let key in arr) {

      $.get("./budget_breakdown/" + key + ".csv", function(data) {
        let destructured = {};
        data = Papa.parse(data, {header: true, skipEmptyLines: true});
        data = data['data'];
        for (let x = 0; x < data.length; x++) {
          const {Category, Spending} = data[x];
          let spending = Number(Spending.replace('$', '')
                                        .replace(',', ''));
          data[x][Category] = spending;
          destructured[Category] = spending;

        }

        arr[key] = destructured;
        //arr[key] = data;

      }).done(function() {
        let keys = Object.keys(arr[key]);

        // Aggregate keys for labels dropdown
        for (let x = 0; x < keys.length; x++) {
          if (spendingLabels.indexOf(keys[x]) === -1 && keys[x] !== 'Total') {
            spendingLabels.push(keys[x]);
          }
        }
        counter++;
        if (Object.keys(arr).length === counter) {
          // Append to #categoryDropdown
          spendingLabels.sort();
          $('#categoryDropdown').append('<option value="Total">Total</option>');
          for (let i = 0; i < spendingLabels.length; i++){
            $('#categoryDropdown').append(`<option value="${spendingLabels[i]}">${spendingLabels[i]}</option>`);
          }

          // Build arrays of each category
          console.log(arr);
          for (let cat in arr) {
            for (let x = 0; x < spendingLabels.length; x++) {
              if (!arr[cat][spendingLabels[x]]) {
                arr[cat][spendingLabels[x]] = 0;
              }
              if (!spendingTotals[spendingLabels[x]]) {
                spendingTotals[spendingLabels[x]] = [];
              }
              spendingTotals[spendingLabels[x]].push(arr[cat][spendingLabels[x]]);
            }
          }
          console.log(spendingTotals);
        }

      });
    }
  });
}
gatherData(months).then(buildLineChart(lineChartDemo, lineChartData));

function buildLineChart(chart, chartObj) {
  let $selected = $('#categoryDropdown').val();
  //console.log(!$('#categoryDropdown').val());
  if (!$selected) {
    $selected = 'Total';
  };

  console.log(spendingTotals[$selected]);

  chartObj.labels = Object.keys(months);

  // programmatically get label (category) -> use html dropdown
  chartObj.datasets[0].label = $selected;
  chartObj.datasets[0].data = spendingTotals[$selected];

  chart.update();
}

// change function for option values (dropdown)
$('#categoryDropdown').change(function(){
  buildLineChart(lineChartDemo, lineChartData);
});







// Dashboard controls
$('#monthly').click(function() {
  $('.line').hide();
  $('.doughnut').show();
});

$('#category').click(function() {
  $('.doughnut').hide();
  $('.line').show();
});
