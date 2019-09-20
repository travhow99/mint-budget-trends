let state = {};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
            (async function() {
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
        state = {spendingData, ...state};
        console.log(state);
        resolve(spendingData);
        reject(error);
    });
}

// Function is logging before data is ready
// Needs to be async
function gatherCategories(obj) {
    console.log(obj);
    const categories = [];
    // let data = await Object.entries(obj);
    const breakdown = Object.values(obj);
    try {
        console.log('trying ', breakdown)
        breakdown.forEach((year) => {
            // console.log(Object.values(year));
            const months = Object.values(year);

            months.forEach((m) => {
                const cats = Object.keys(m);
                console.log(m);
                console.log(cats);

                cats.forEach((cat) => {
                    /* if (categories.indexOf(cat) >= 0) {
                        // console.log('dup')
                        return;
                    } */
                    console.log(cat);
                    categories.push(cat);
                })
            })
        })
        if (categories.length > 0) {
            return categories;
        } else {
            console.log('cate mpty')
        }
    } catch (error) {
        console.log(error);
    }
    // console.log(categories);


    return obj;
    return categories;

    return new Promise((resolve, reject) => {

        for (let year in data) {
            let months = data[year];

            console.log(Object.keys(months));
            console.log(Object.entries(months))

            let entries = Object.entries(months);

            console.log(entries);
            for (let m in entries) {
                console.log(entries[m][1])
            }
            return;

            for (let m of entries) {
                console.log(Object.keys(m[1]));
                for (let x of m) {
                    console.log(x)
                    if (typeof (x) === 'object') {
                        console.log(x)
                        let cats = { ...x }
                        console.log(cats);
                        console.log(Object.getOwnPropertyNames(x))
                    }
                }
            }

            return;

            for (let m of Object.keys(months)) {
                console.log(m)
                let val = months[m];
                console.log(val)
            }
        }

        return;

        for (let year of Object.keys(obj)) {
            // const months = Object.keys(obj[year]);
            const months = obj[year];
            console.log(months)
            console.log(Object.entries(months))

            for (let month in months) {
                // const month = month;
            }

        }
    });
}

function stringifyCategory(cat) {
    return cat.replace(/\s/g, '_').toLowerCase();
}

function dollarToNum(str) {
    return parseFloat(str.replace(/[,\$]/g, ''));
}

// buildMonthDropdown(uploads);