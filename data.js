const months = [];
console.log('test');

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
/*
function fixSpending(obj) {
  console.log(obj);
  for (let x = 0; x < obj.length; x++) {
    let spending = arr[x]['Spending'];
    spending = spending.substr(1,);
    spending = spending.replace(',', '');
    obj[x]['Spending'] = spending;
    console.log(obj[x]);
  }

}
*/


// Build large dataBuilder function for call back function
// Function needs to build months[month] arrays then call next functions
function formatCSV(arr, callback) {
  for (let key in arr) {
    //console.log(key);
    let file = "./budget_breakdown/" + key + ".csv";

    data = Papa.parse(file, {header: true, skipEmptyLines: true});
    console.log(data);

    data = data['data'];

/*
    Papa.parsePromise = function(file) {
      return new Promise(function(complete, error) {
        Papa.parse(file, {complete, error});
      });
    };
    Papa.parsePromise(file)
                                        .then(function(results) {console.log(results); });


                                        */
    /*
    ("./budget_breakdown/" + key + ".csv", {
    	complete: function(results) {
    		console.log(results);
    	}
      */
    }




/* d3 csv
    d3.csv("./budget_breakdown/" + key + ".csv", function(data) {
      console.log(key);

      let spending = data['Spending'];
      spending = spending.replace('$', '');
      spending = spending.replace(',', '');
      spending = Number(spending);
      data['Spending'] = spending;

      arr[key].push(data);
      //const march = data;
      //march.push(...data);
      //console.log(march);
    });
*/
    //arr["march"] = march;

  }
  //callback(arr);

formatCSV(months);
