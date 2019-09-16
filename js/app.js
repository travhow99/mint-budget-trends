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
            console.log(year);
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
                    .then(res => buildMonthDropdown(res));
                    // .then(obj)
                    // .catch(e => console.log('Error: ' + e));

function buildMonthDropdown(obj) {
    const yearsAdded = [];
    for (let year of Object.keys(obj)) {
        console.log(year);
        const months = obj[year];
        console.log(months);

        let tmpDropdown = `<option disabled value="${year}">${year}</option>`;

        for (let month of months){
            // $('.monthDropdown').append(`<option value="${month}">${month}</option>`);
            tmpDropdown += `<option value="${month}">${month}</option>`;
        }

        if (year < yearsAdded[yearsAdded.length - 1]) {
            $('.monthDropdown').append(tmpDropdown);
        } else {
            $('.monthDropdown').prepend(tmpDropdown);
        }
        yearsAdded.push(year);

    }
    console.log(yearsAdded);
}

// buildMonthDropdown(uploads);