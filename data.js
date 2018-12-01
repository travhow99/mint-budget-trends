const months = [];
const spendingLabels = [];
const spendingTotals = {};


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
  let counter = 0;

  // Loop through months to populate months with all data
  for (let key in arr) {

    $.get("./budget_breakdown/" + key + ".csv", function(data) {
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
      //arr[key] = data;

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

      }



      // If category not present for month
        //


    });
  }
  console.log(spendingLabels);
}
gatherData(months);









// Dashboard controls
$('#monthly').click(function() {
  $('.line').hide();
  $('.doughnut').show();
});

$('#category').click(function() {
  $('.doughnut').hide();
  $('.line').show();
});
