<?php
    // Specify the directory to scan for files
    $dir    = './budget_breakdown/';
    // Store the scandir results in a variable
    $files = array_diff(scandir($dir), array('.', '..', '.DS_Store'));
    // Encode the array in JSON and echo it
    echo json_encode($files);
?>