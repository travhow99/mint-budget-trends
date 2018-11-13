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

// Function needs to build months[month] arrays then call next functions
function formatCSV() {
  d3.csv("./budget_breakdown/march.csv").then(function(data) {
    //const march = data;
    march.push(...data);
    console.log(march);
  });
  months["march"] = march;
}
formatCSV();
