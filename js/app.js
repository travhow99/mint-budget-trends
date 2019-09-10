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