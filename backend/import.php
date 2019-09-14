<?php
    $month = strtolower($_POST['month']);
    $year = $_POST['year'];

    $file = $_POST['file'];

    $target_dir = '../uploads/';
    $target_file = $target_dir . $year . '/' . $month . '.csv';
    $uploadOk = 1;

    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    if (!file_exists($target_dir.'/'.$year)) {
        echo 'making';
        mkdir($target_dir.'/'.$year, 0777, true);
    }
    
    if (!move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
        throw new RunTimeException('Upload failed.');
    }
    $response = array(
        'status'  => 'success',
        'message' => 'File uploaded to '.$target_file.'!'
    );
    echo json_encode($response);