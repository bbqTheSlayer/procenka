<?php

$action = $_POST['ms2_action'];

header('Content-type: application/json; charset=utf-8');

$Response = array();

switch ($action) {
    case 'order/add':
        $Response = array(
            'success' => true,
            'message' => '',
            'data' => array(
                $_POST['key'] => $_POST['value']
            )
        );

        break;

    default:
        $Response = array(
            'success' => 'false',
            'message' => 'missed action'
        );

        break;
}

exit(json_encode(
    $Response
));
