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
    .then(console.log)
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
    return new Promise((resolve, reject) => {

        for (let year of Object.keys(obj)) {
            const months = obj[year];
            spendingData[year] = {};

            // Promise.all here
            (async function () {
                // map through month
                months.map(async month => {
                    // build filepath
                    const m = month.toLowerCase();

                    spendingData[year][m] = {};
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

            /*             for (let month of months) {
                            let m = month.toLowerCase();
            
                            spendingData[year][m] = {};
                            let filePath = `./uploads/${year}/${m}.csv`;
                            Papa.parse(filePath, {
                                header: true,
                                download: true,
                                skipEmptyLines: true,
                                complete(results) {
                                    results.data.map(a => {
                                        let { Category, Spending } = a;
                                        let cat = stringifyCategory(Category);
                                        spendingData[year][m][cat] = dollarToNum(Spending);
                                    });
                                    // console.log(res);
            
                                    // spendingData[year][month] = results.data;
                                }
                            });
                        }
             */
        }
        console.log(spendingData);
        state = { spendingData, ...state };
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
function initiateDoughnut() {
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
    var ctx = document.getElementById("doughnutChart").getContext('2d');
    console.log(ctx);

    var doughnutChart = new Chart(ctx, {
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
            scales: {
                yAxes: [{
                    display: false,
                }]
            },
            // Add percentages to tooltips
/*             tooltips: {
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
 */        }
    });

    /** Start doughnut */



}

$('.monthDropdown').on('change', function() {
    initiateDoughnut();
});

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

// Dashboard controls
$('#monthly').click(function() {
    // initiateDoughnut();

    $('.dashboard .col-sm-10').hide();
    $('.doughnut').show();
});

$('#category').click(function() {
    if (!state.categories) {
        state.categories = gatherCategories(state.spendingData);
        console.log(state);
    }

    $('.dashboard .col-sm-10').hide();
    $('.line').show();
});


const stringifyCategory = function(cat) {
    return cat.replace(/\s/g, '_').toLowerCase();
}

const dollarToNum = function(str) {
    return parseFloat(str.replace(/[,\$]/g, ''));
}

const splitMonthAndYear = function(str) {
    return str.toLowerCase().split('_');
}

const formatLabels = function(str) {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// buildMonthDropdown(uploads);