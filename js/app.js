const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

$('#home').click(function () {
    $('.dashboard .col-sm-10').hide();
    $('.welcome').show();
});

$('#monthly').click(function () {
    // buildDoughnutChart(myChart);
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

orderMonths(uploads)
                    .then(res => buildMonthDropdown(res))
                    .then(res => gatherData(res))
                    .catch(e => console.log('Error: ' + e));

function buildMonthDropdown(obj) {
    const yearsAdded = [];
    for (let year of Object.keys(obj)) {
        const months = obj[year];

        let tmpDropdown = `<option disabled value="${year}">${year}</option>`;

        for (let month of months){
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
    return obj;
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

        for (let month of months) {
            spendingData[year][month] = {};
            let filePath = `./uploads/${year}/${month.toLowerCase()}.csv`;
            Papa.parse(filePath, {
                header: true, 
                download: true,
                skipEmptyLines: true,
                complete: function(results) {
                    spendingData[year][month] = {};
                    results.data.map(a => {
                        let {Category, Spending} = a;
                        spendingData[year][month][Category] = dollarToNum(Spending);
                    });
                    // console.log(res);
                    
                    // spendingData[year][month] = results.data;
                }
            });
        }

      }
      console.log(spendingData);

    });
}

function gatherCategories(obj) {
    for (let year of Object.keys(obj)) {

      for (let month of months) {

      }

    }
}

function dollarToNum(str) {
    return parseFloat(str.replace(/[,\$]/g, ''));
}

// buildMonthDropdown(uploads);