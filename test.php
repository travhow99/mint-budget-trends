<?php
  $test = 'test';
  echo $test;
  echo 'fart';
  $csv = array_map('str_getcsv', file('./budget_breakdown/october.csv',FILE_SKIP_EMPTY_LINES));
  //print_r($csv);
  $keys = array_shift($csv);

  $csvFile = file('./budget_breakdown/october.csv');
  $data = [];
  foreach ($csv as $i=>$line) {
    $csv[$i] = array_combine($keys, $line);
  }
  print_r($csv);

?>
