$('#home').click(function () {
    $('.dashboard .col-sm-10').hide();
    $('.welcome').show();
});

$('#monthly').click(function () {
    buildDoughnutChart(myChart);
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

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
for (let x of monthNames) {
    $('#monthSelect').append(`<option value='${x}'>${x}</option>`);
}

const date = new Date().getFullYear();

for (let x = date; x > date - 5; x--) {
    // years.push(x);
    $('#yearSelect').append(`<option value='${x}'>${x}</option>`);
} 