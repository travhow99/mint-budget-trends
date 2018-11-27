<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Anton|Raleway" rel="stylesheet">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">


  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.6.1/papaparse.js"></script>

  <script src="https://d3js.org/d3-dsv.v1.min.js"></script>
  <script src="https://d3js.org/d3-fetch.v1.min.js"></script>


</head>
<?php
  include 'test.php';



?>
<?php
$bool = false;
$num = 3 + 4;
$str = "A string here";
?>




<body>
  <div class="container-fluid dashboard">
    <div class="row">
      <div class="col-sm-2 sidebar">
        <ul class="menu">
          <h3>Welcome.</h3>
          <hr>
          <li id="home" class="btn btn-block text-left">home</li>
          <li id="monthly" class="btn btn-block text-left">monthly</li>
          <li id="category" class="btn btn-block text-left">by category</li>
        </ul>
      </div>
      <div class="col-sm-10 doughnut">
        <h2>Mint Budget Breakdown</h2>
        <hr>
        <h3>Monthly Spending Breakdown</h3>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
      <div class="col-sm-10 line">
        <h2>Mint Budget Breakdown</h2>
        <hr>
        <h3>Monthly Spending by Category</h3>
        <select id="categoryDropdown"></select>
        <canvas id="lineChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>



<!--   <script type="text/javascript" src="data.js"></script>!-->
  <script type="text/javascript" src="chart.js"></script>
  <script type="text/javascript">
// boolean outputs "" if false, "1" if true
var bool = "<?php echo $bool ?>";

// numeric value, both with and without quotes
var num = <?php echo $num ?>; // 7
var str_num = "<?php echo $num ?>"; // "7" (a string)

var str = "<?php echo $str ?>"; // "A string here"

var data = "<?php echo $data ?>";

var csv = "<?php echo $csv ?>";

</script>

</body>
