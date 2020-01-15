let state = {};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$('#home').click(function () {
    $('.dashboard .col-sm-10').hide();
    $('.welcome').show();
});

$('#monthly').click(function () {
    // buildDoughnutChart(doughnutChart);
    $('.dashboard .col-sm-10').hide();
    $('.doughnut').show();
});

$('#category').click(function () {
    buildLineChartLabels(state.spendingData);

    $('.dashboard .col-sm-10').hide();
    $('.line').show();
});

$('#upload').click(() => {
    $('.dashboard .col-sm-10').hide();
    $('.upload').show();
});

for (let x of monthNames) {
    $('#monthSelect').append(`<option value='${x}'>${x}</option>`);
}

const date = new Date().getFullYear();

for (let x = date; x > date - 5; x--) {
    // years.push(x);
    $('#yearSelect').append(`<option value='${x}'>${x}</option>`);
}


// Function needs to be promise to build dropdown after gathering filenames
async function orderMonths(obj) {
    return new Promise((resolve, reject) => {
        for (let year in obj) {
            const monthFiles = [];
            const foundMonths = Object.values(obj[year]);

            /*         for (let month in obj[year]) {
                        const yr = obj[year];
                        console.log(yr[month]);
                        if (monthNames.indexOf(month.toLowerCase() >= 0)) {
                            monthFiles.push(yr[month]);
                        }
                    } */
            for (let month in monthNames) {
                const m = monthNames[month];
                if (foundMonths.indexOf(m.toLowerCase()) >= 0) {
                    monthFiles.push(m);
                }
            }
            obj[year] = monthFiles;
        }
        resolve(obj);
    });
}

// Make full promise chain?
orderMonths(uploads)
    .then((res) => {
        buildMonthDropdown(res);
        return gatherData(res);
    })
    // .then((res) => gatherData(res))
    // .then((data) => gatherCategories(data))
    // .then((data) => buildCategoryDropdown(data))
    .catch(e => console.log('Error: ' + e));

function buildMonthDropdown(obj) {
    const yearsAdded = [];
    for (let year of Object.keys(obj)) {
        const months = obj[year];

        let tmpDropdown = `<option disabled value="${year}">${year}</option>`;

        for (let month of months) {
            // $('.monthDropdown').append(`<option value="${month}">${month}</option>`);
            tmpDropdown += `<option value="${month}_${year}">${month}</option>`;
        }

        if (year < yearsAdded[yearsAdded.length - 1]) {
            $('.monthDropdown').append(tmpDropdown);
        } else {
            $('.monthDropdown').prepend(tmpDropdown);
        }
        yearsAdded.push(year);
    }
    const defaultOption = `<option value="default" default selected disabled>Choose a Month</option>`;
    $('.monthDropdown').prepend(defaultOption);
    // return obj;
}

// Take object
// for each year
// get each month from array
// Build master array fo data
async function gatherData(obj) {
    const spendingData = {};
    const totals = {};
    return new Promise((resolve, reject) => {

        for (let year of Object.keys(obj)) {
            const months = obj[year];
            spendingData[year] = {};
            totals[year] = {};
            // Promise.all here
            (async function () {
                // map through month
                months.map(async month => {
                    // build filepath
                    const m = month.toLowerCase();

                    spendingData[year][m] = {};
                    totals[year][m] = {};

                    const filePath = `./uploads/${year}/${m}.csv`;

                    await Papa.parse(filePath, {
                        header: true,
                        download: true,
                        skipEmptyLines: true,
                        complete(results) {
                            results.data.map(a => {
                                let { Category, Spending } = a;
                                let cat = stringifyCategory(Category);
                                
                                spendingData[year][m][cat] = dollarToNum(Spending);
                            });
                        }
                    })

                });
            })();
        }
        console.log(spendingData);
        state = { spendingData, totals, ...state };
        console.log(state);
        resolve(spendingData);
        reject(error);
    });
}

function gatherCategories(obj) {
    const categories = [];
    // let data = await Object.entries(obj);
    const breakdown = Object.values(obj);
    try {
        breakdown.forEach((year) => {
            // console.log(Object.values(year));
            const months = Object.values(year);

            months.forEach((m) => {
                const cats = Object.keys(m);

                cats.forEach((cat) => {
                    if (categories.indexOf(cat) >= 0) return;
                    if (cat === 'total') return;
                    categories.push(cat);
                })
            })
        });
        if (categories.length > 0) {
            categories.sort().push('total');
            console.log(categories);
            return categories;
        } else {
            console.log('cate mpty')
        }
    } catch (error) {
        console.log(error);
    }
}

// Chart Functions
var doughnutChart, doughnutChart2, lineChart;

function initiateDoughnut(chart = 'doughnutChart') {
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
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(75, 229, 35, 0.8)',
        'rgba(184, 1, 115, 0.8)',
        'rgba(246, 151, 54, 0.8)',
        'rgba(97, 125, 231, 0.8)',
        'rgba(205, 109, 202, 0.8)',
        'rgba(40, 2, 127, 0.8)',
        'rgba(135, 236, 217, 0.8)',
        'rgba(69, 179, 193, 0.8)'
    ];

    let DoughnutData = {
        labels: [],

    }

    const $selected = $('.monthDropdown').val();
    let [month, year] = splitMonthAndYear($selected);
    console.log(month, year);

    let labels = Object.keys(state.spendingData[year][month]);

    labels = labels.map((x) => formatLabels(x));
    labels.pop();
    console.log(labels);

    const data = Object.values(state.spendingData[year][month]);
    data.pop();
    console.log(data)

    /* doughnut chart */
    var ctx = document.getElementById(chart).getContext('2d');
    console.log(ctx);

    if (chart === 'doughnutChart') {
        doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: `${month} spending`,
                    data: data,
                    backgroundColor: chartColors,
                    borderColor: chartBorders,
                }],

                //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                // datasets: []
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        display: false,
                    }]
                },
                // Add percentages to tooltips
                tooltips: {
                    callbacks: {
                        label(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                            return currentValue + ' (' + percentage + '%)';
                        },
                        title(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
            }
        });
    } else {
        doughnutChart2 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: `${month} spending`,
                    data: data,
                    backgroundColor: chartColors,
                    borderColor: chartBorders,
                }],

                //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                // datasets: []
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        display: false,
                    }]
                },
                // Add percentages to tooltips
                tooltips: {
                    callbacks: {
                        label(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                            return currentValue + ' (' + percentage + '%)';
                        },
                        title(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
            }
        });

    }


    /** Start doughnut */

}

const updateDoughnutChart = function (chart) {
    let $selected;
    if (chart === doughnutChart) {
        $selected = $('.monthDropdown').val();
    } else {
        $selected = $('.monthDropdown2').val();
    }

    let [month, year] = splitMonthAndYear($selected);

    let labels = Object.keys(state.spendingData[year][month]);

    labels = labels.map((x) => formatLabels(x));
    labels.pop();

    const data = Object.values(state.spendingData[year][month]);
    data.pop();

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets.label = `${month} spending`;

    chart.update();

}

$(document).on('click', '.center', function () {
    console.log('clicky');
    if (!$(this).hasClass('added')) {
        $('#chart2').empty().append(`<div class="hideChart">X</div>
      <canvas id="newChart" width="400" height="400"></canvas>
    `);

        //   compareMonths();
        initiateDoughnut('newChart');
        $('#chart2').addClass('added');
        $('.monthDropdown').clone().removeClass('monthDropdown').addClass('monthDropdown2').prependTo('#chart2');
        $('.hideChart').show();
    }

});

$('.monthDropdown').on('change', function () {
    // If no chart yet
    if (!doughnutChart) {
        // initiate
        initiateDoughnut();
    } else {
        // Update chart
        updateDoughnutChart(doughnutChart);
    }
});

$('body').on('change', '.monthDropdown2', function () {
    console.log('change');
    updateDoughnutChart(doughnutChart2);
});

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
  var lineChart = new Chart(cty, {
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
  

$('#categoryDropdown').change(function () {
    buildLineChart(lineChart, lineChartData);
});

function buildLineChart(chart, chartObj) {
    let $selected = $('#categoryDropdown').val();
    //console.log(!$('#categoryDropdown').val());
    if (!$selected) {
        $selected = 'total';
    };

    console.log($selected);
    chartObj.labels = state.months ? state.months : buildLineChartLabels(state.spendingData);

    chartObj.datasets[0].label = formatLabels($selected);
    chartObj.datasets[0].data = state.categoryData[$selected];

    chart.update();

    // programmatically get label (category) -> use html dropdown
    // chartObj.datasets[0].label = $selected;

/*     if ($selected === 'Total') {
        chartObj.datasets[0].data = totals;
    } else {
        chartObj.datasets[0].data = spendingTotals[$selected];
    }
 */
    // chart.update();
}

function buildLineChartLabels(obj) {
    const labels = [];

    for (let year of Object.keys(obj)) {
        const months = Object.keys(obj[year]);

        for (let month of months) {
            labels.push(`${ucfirst(month)} ${year}`);
        }
    }
    state.months = labels;
    console.log(labels);
    return labels;
}

// Dashboard controls
$('#monthly').click(function () {
    // initiateDoughnut();

    $('.dashboard .col-sm-10').hide();
    $('.doughnut').show();
});

$('#category').click(function () {
    if (!state.categories) {
        state.unformattedCategories = gatherCategories(state.spendingData);
        console.log(state);
        state.categories = state.unformattedCategories.map((x) => formatLabels(x))

        buildCategoryDropdown(state.categories);
    }

    if (!state.categoryData) {
        buildLineChartData();
    }

    buildLineChart(lineChart, lineChartData);

    $('.dashboard .col-sm-10').hide();
    $('.line').show();
});

function buildCategoryDropdown(obj) {
    console.log(obj);
    const values = state.unformattedCategories;

    for (let i = 0; i < obj.length; i++){
      $('#categoryDropdown').append(`<option value="${values[i]}">${obj[i]}</option>`);
    }
}

const buildLineChartData = function() {
    state.categoryData = {};
    const categories = state.unformattedCategories;

    // Loop through each category
    categories.forEach((cat) => {
        const results = [];
        // TODO: Simplify with reduce....


        // Loop through state.spendingData
        const spendingData = state.spendingData;
        const years = Object.keys(spendingData);

        years.forEach((year) => {
            const months = Object.keys(spendingData[year]);

            // Loop through each year
            months.forEach((month) => {
                const spending = spendingData[year][month][cat] || 0;
                // Reduce to get month.cat
                results.push(spending);
            })
        })
        // Add to state
        state.categoryData[cat] = results;

    })
}

const stringifyCategory = function (cat) {
    return cat.replace(/\s/g, '_').toLowerCase();
}

const dollarToNum = function (str) {
    return parseFloat(str.replace(/[,\$]/g, ''));
}

const splitMonthAndYear = function (str) {
    return str.toLowerCase().split('_');
}

const formatLabels = function (str) {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const ucfirst = function(str) {
    return str.replace(/^\w/, c => c.toUpperCase());
}

// buildMonthDropdown(uploads);