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

function gatherData(arr) {
  // Loop through months to populate months with all data
  for (let key in arr) {

    $.get("./budget_breakdown/" + key + ".csv", function(data) {
      let destructured = {};
      data = Papa.parse(data, {header: true, skipEmptyLines: true});
      data = data['data'];
      for (let x = 0; x < data.length; x++) {
        console.log(data[x]);
        const {Category, Spending} = data[x];
        console.log(Category);
        data[x][Category] = Spending;
        destructured[Category] = Spending;
        console.log(data[x]);

      }
      console.log(destructured);
      arr[key] = destructured;
      //arr[key] = data;

    }).done(function() {
      console.log(arr[key]);
    });
  }
}
gatherData(months);
