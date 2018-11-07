const months = [];

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

function fixSpending(arr) {
  for (let x = 0; x < arr.length; x++) {
    let spending = arr[x]['Spending'];
    spending = spending.substr(1,);
    spending = spending.replace(',', '');
    arr[x]['Spending'] = spending;
  }
}

months["august"] = august;//,
months["september"] = september;
months["october"] = october;


// Map arrow function to apply fixSpending()
for (let key in months) {

  fixSpending(months[key]);
}

//console.log(september);

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Spending',
            //data: [],//[sept, sept1, Number(september[2]['Spending']), 5, 2, 3],
            backgroundColor: [
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
            ],
            borderColor: [
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
            ],
            borderWidth: 1
        },
        {
            label: 'Spending',
            //data: [],//[sept, sept1, Number(september[2]['Spending']), 5, 2, 3],
            backgroundColor: [
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
            ],
            borderColor: [
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
            ],
            borderWidth: 1
        },
        {
            label: 'Spending',
            //data: [],//[sept, sept1, Number(september[2]['Spending']), 5, 2, 3],
            backgroundColor: [
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
            ],
            borderColor: [
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
            ],
            borderWidth: 1
        }]
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

      if (labels.indexOf(current[x]['Category']) === -1 && current[x]['Category'] !== 'Total') {
        labels.push(current[x]['Category']);
      }
    }
  }
  // Sort function
  //months[key].sort((a,b) => (a.Category > b.Category) ? 1 : ((b.Category > a.Category) ? -1 : 0));
  //console.log(months[key]);
  labels.sort();
  console.log(labels);


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
        // if label does not exist in months[key]
          // splice labels: '0' into months[key]



        //console.log(currentCategory);


        //console.log(currentCategory);
        //data.push(currentCategory);


        // if not in labels
        //console.log(labels[i]);
        //if (labels[i])
          // add 0 to data
      }
      if (!match) {
        months[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
      }

    }

      /*
      if (!match) {
        //console.log('nogo');
        mismatch.push(x);
        //months[key][i]['Category'] = labels[key];
        //console.log(mismatch);
        //console.log(months[key]);
        months[key].splice(x, 0, {"Category": labels[x], "Spending": "0"});
        //console.log(months[key]);
      }
*/
      //console.log(months[key][11]);
    //console.log(months[key]);

    //console.log(labels);

    const current = months[key];

    for (let x in current) {
      //console.log(current[x]);

      if (current[x]['Category'] !== "Total"){
        console.log(current[x]);
        data.push(Number(current[x]['Spending']));
      }
    }
    myChart['data']['datasets'][num]['data'] = data;
    myChart['data']['datasets'][num]['label'] = key;
    num++;

    //console.log(data);

    console.log(months[key]);

  }

//console.log(labels);

  //myChart['data']['labels'] = labels;
  chart.update();
}
compileData(myChart);
console.log(myChart['data']);
