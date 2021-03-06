let newChart;

const months = [];
const totals = [];
const spendingLabels = [];
const spendingTotals = {};

/* doughnut chart */
var ctx = document.getElementById("myChart").getContext('2d');
console.log(ctx);

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: []
    },
    options: {
        scales: {
            yAxes: [{
                display: false,
            }]
        },
        // Add percentages to tooltips
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat((currentValue/total*100).toFixed(1));
              return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
    }
});

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


// Take object
// for each year
// get each month from array
// Build master array fo data
async function gatherData(obj) {
  return new Promise((resolve, reject) => {

    for (let year of Object.keys(obj)) {
      console.log(year);
    }

    // let counter = 0;
    // Loop through months to populate months with all data
/*     for (let key in arr) {

      $.get("./uploads/" + key + ".csv", function(data) {
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
        totals.push(arr[key].Total);
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
 */    
  });
}
gatherData(months)
                  .then(evenCompareHeight())
                  .then(buildLineChart(lineChartDemo, lineChartData));

/*
async function asyncFunction() {
  var result = await gatherData(months);
  var resultTwo = await evenCompareHeight(result);
  var resultThree = await buildLineChart(lineChartDemo, lineChartData);

  return resultThree;
}

asyncFunction();
*/

function buildDoughnutChart(chart) {
  let $selected;
  let dataObject = {};
  let labels = [];
  //console.log(Object.keys(months[$selected]));
  //if (chart === new)
  if (chart.id >= 1) {
    $selected = $('.monthDropdown2').val();
    if (!$selected) {
      $selected = 'january';
    }
    console.log('yes', $selected);
  } else {
    $selected = $('.monthDropdown').val();
  }
  let data = months[$selected];
  console.log($selected);
  // Remove empty values and totals from data
  for (let key in data) {
    if (data[key] === 0 || key === 'Total') {
      delete data[key];
    }
  }
  let obj = {}
  Object.keys(data)
    .sort()
    .forEach(function(v, i) {
        //console.log(v, arr[x][v]);
        let spending = data[v];
        obj[v] = spending;

     });

   console.log(obj);


  console.log(data);

  labels.push(...Object.keys(obj));
  dataObject['data'] = Object.values(obj);


  //dataObject['data'] = data;
  //dataObject['label'] = key;
  dataObject['backgroundColor'] = chartColors;
  dataObject['borderColor'] = chartBorders;
  dataObject['borderWidth'] = 1;

  console.log(chart);
  // This should equal data(numbers)
  chart['data']['datasets'][0] = dataObject;
  chart['data']['labels'] = labels;
  chart.update();

}

function buildLineChart(chart, chartObj) {
  let $selected = $('#categoryDropdown').val();
  //console.log(!$('#categoryDropdown').val());
  if (!$selected) {
    $selected = 'Total';
  };

  chartObj.labels = Object.keys(months);

  // programmatically get label (category) -> use html dropdown
  chartObj.datasets[0].label = $selected;

  if ($selected === 'Total') {
    chartObj.datasets[0].data = totals;
  } else {
    chartObj.datasets[0].data = spendingTotals[$selected];
  }

  chart.update();
}

/* function to compare months */
function compareMonths() {
  // build new version of myChart
  var ctx = document.getElementById("newChart").getContext('2d');//.getContext('2d');
  console.log(ctx);
  newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: []
      },
      options: {
          scales: {
              yAxes: [{
                  display: false,
              }]
          },
          // Add percentages to tooltips
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
      }
  });

  console.log(newChart);
  buildDoughnutChart(newChart);
    // based on new selected month from dropdown?
    // Or default to january
  // execute buildDoughnutChart() on myChart2

}



$(document).on('click', '.center', function() {
  console.log('clicky');
  if (!$(this).hasClass('added')) {
    $('#chart2').empty().append(`<div class="hideChart">X</div>
    <canvas id="newChart" width="400" height="400"></canvas>
  `);

    compareMonths();
    $('#chart2').addClass('added');
    $('.monthDropdown').clone().removeClass('monthDropdown').addClass('monthDropdown2').prependTo('#chart2');
    $('.hideChart').show();
  }

});



// change function for months (doughnut chart)
$('.monthDropdown').change(function(){
  console.log('changed');
  let chart = $(this).siblings('canvas');
  chartId = chart.attr('id');
  console.log(chartId);
  if (chartId === 'myChart') {
    buildDoughnutChart(myChart);
  } else if (chartId === 'newChart') {
    buildDoughnutChart(newChart);
  }
});

$(document).on('change', '.monthDropdown2', function(){
  console.log('changed');
  let chart = $(this).siblings('canvas');
  chartId = chart.attr('id');
  console.log(chartId);
  if (chartId === 'myChart') {
    buildDoughnutChart(myChart);
  } else if (chartId === 'newChart') {
    buildDoughnutChart(newChart);
  }
});

// change function for option values (dropdown)
$('#categoryDropdown').change(function(){
  buildLineChart(lineChartDemo, lineChartData);
});





/* function buildMonthDropdown() {
  //$('.monthDropdown').append('<option value="default">Select Your Month</option>');
  for (let key in months){
    $('.monthDropdown').append(`<option value="${key}">${key}</option>`);
  }
}
buildMonthDropdown();
 */
// Dashboard controls

$(document).on('click', '.hideChart', function() {
  console.log('hide');
  $('#chart2').removeClass('added').empty().append(`<div class="hideChart">X</div>
  <div class="center">
    <i class="fas fa-plus-circle"></i>
  </div>
  <canvas id="newChart2" width="400" height="400"></canvas>
`);
  //$('#chart2')

  evenCompareHeight();

});

function evenCompareHeight() {
  console.log($('.col-sm-10').width());
  $height = $('#myChart').height();
  if ($height === 0) {
    $height = $('.col-sm-10').width() / 2.5;
  }
  $('#chart2').css('height',$height);
}

$( window ).resize(function() {
  evenCompareHeight();
});
