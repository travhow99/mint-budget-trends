<?php
  $years = array_diff(scandir('uploads'), array('..', '.'));
  // $files = scandir($)
  $months = array();
  foreach($years as $year) {
    $arr = array_diff(scandir('uploads/'.$year), array('..', '.'));
    $months[$year] = $arr;
  }

  foreach($months as $key => $year) {

    $m = array_map('removeFileExtension', $year);
    $months[$key] = $m;
    // uksort($months[$key], "compare_months");
  }

  function removeFileExtension($str) {
    return str_replace('.csv', '', $str);
  }
	
	function compare_months($a, $b) {
    echo $a.'<br>'.$b;
    $monthA = strtotime($a);
    $monthB = strtotime($b);

    return $monthA - $monthB;
	}
?>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./css/styles.css">
  <link href="https://fonts.googleapis.com/css?family=Anton|Raleway" rel="stylesheet">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

  <script src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" data-auto-replace-svg="nest"></script>
  <!-- Latest compiled JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.6.1/papaparse.js"></script>

  <script src="https://d3js.org/d3-dsv.v1.min.js"></script>
  <script src="https://d3js.org/d3-fetch.v1.min.js"></script>


</head>

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
          <li id="upload" class='btn btn-block text-left'>upload</li>
        </ul>
      </div>
      <div class="col-sm-10 welcome">
        <h2>Mint Budget Breakdown</h2>
        <hr>
        <h3>Welcome to Your Mint Budget Breakdown</h3>
        <p class="lead">Let's begin by getting your .csv files from Mint.</p>
        <ol id="setup">
          <li>Head on over to <a href="https://www.mint.com/" target="_blank">mint.com</a>.</li>
          <li>Click the <a href="https://mint.intuit.com/trend.event" target="_blank">Trends</a> tab.</li>
          <li>Under <code>spending</code>, select <code>by category</code></li>
          <li>Begin to gather data month by month. To begin, click <code>Show Custom Filters</code>, and change the <code>during</code> dropdown to <code>Last month</code>.</li>
          <li>Scroll down and select <code>export to CSV</code>.</li>
          <li>After this, it is a bit more involved, but you just need to change the <code>During</code> dropdown to select each preceding month, as far back as you would like to compare data for. The following months will be much easier, as you can simply select <code>Last month</code> on the 1st of each month.</li>
          <li>Name each CSV after the month name, ie. <code>january.csv</code>.</li>
          <li>After you collect all the CSVs, you will want to drag them to the <code>/uploads</code> folder.</li>
          <li>Update the <code>data.js `months`</code> array to include/remove and months as needed depending on the files you are using.</li>
          <li>That's it! Open the program and start comparing your budget. Use this to help you better plan for future months, by seeing where you may need to cut back or which categories you are doing a good job in. Good luck!</li>
        </ol>
      </div>
      <div class="chart-container col-sm-10 doughnut">
        <h2>Mint Budget Breakdown</h2>
        <hr>
        <div class="col-sm-5 equal">
          <div id="chart1">
            <h3>Monthly Spending Breakdown</h3>
            <select class="monthDropdown"></select>
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
        <div class="col-sm-5 equal">
          <h3>Compare With Another Month</h3>
          <div id="chart2" class="empty">
            <div class="hideChart" title="Click to hide chart">X</div>
            <div class="center">
              <i class="fas fa-plus-circle"></i>
            </div>
            <canvas id="newChart" width="400" height="400"></canvas>

          </div>
          <!-- What needs to be added via jQuery
          <select id="monthDropdown"></select>
          <canvas id="myChart" width="400" height="400"></canvas>
          !-->
        </div>
      </div>
      <div class="col-sm-10 line">
        <h2>Mint Budget Breakdown</h2>
        <hr>
        <h3>Monthly Spending by Category</h3>
        <select id="categoryDropdown"></select>
        <canvas id="lineChart" width="400" height="400"></canvas>
      </div>

      <div class="col-sm-10 upload">
        <h2>Mint File Upload</h2>
        <hr>
        <h3>Upload Monthly Spending</h3>
        <select id="yearSelect">Year</select>
        <select id="monthSelect">Month</select>

        <input type="file" name="upload" id="dropbox" accept=".csv" onchange="handleFiles(this.files[0])">

      </div>
    </div>

  </div>

<script>
  const uploads = <?php echo json_encode($months); ?>;
</script>
<script type="text/javascript" src='js/app.js'></script>
<script type="text/javascript" src='js/upload.js'></script>
<!-- <script type="text/javascript" src="data.js"></script> -->

</body>
