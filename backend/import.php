<?php
    $month = strtolower($_POST['month']);
    $year = $_POST['year'];

    $file = $_POST['file'];

    if (!file_exists('../uploads')) {
        mkdir('../uploads', 0777, true);
    }
    if (!file_exists('../uploads'.'/'.$year)) {
        echo 'making';
        mkdir('../uploads'.'/'.$year, 0777, true);
    }


    $target_dir = '../uploads/';
    $target_file = $target_dir . $year . '/' . $month . '.csv';
    $uploadOk = 1;
    
    if (!move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
        throw new RunTimeException('Upload failed.');
    }
    $response = array(
        'status'  => 'success',
        'error'   => false,
        'message' => 'File uploaded!'
    );
    echo json_encode($response);