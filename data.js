const months = [];


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

// Function to fix spending
function fixSpending(arr) {
  for (let x = 0; x < arr.length; x++) {
    let spending = arr[x]['Spending'];
    spending = spending.substr(1,);
    spending = spending.replace(',', '');
    arr[x]['Spending'] = spending;
    console.log(arr[x]);
  }
}

// Function needs to build months[month] arrays then call next functions
function formatCSV() {
  for (let key in months) {
    //console.log(key);

    d3.csv("./budget_breakdown/" + key + ".csv", function(data) {
      //console.log(key, data);
      months[key].push(data);
      //const march = data;
      //march.push(...data);
      //console.log(march);
    });
    //months["march"] = march;

  }
  for (let x in months) {
    console.log(x);
      fixSpending(months[x]);
  }

}
formatCSV();
