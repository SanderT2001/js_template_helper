<?php
header('Content-Type: application/json');
echo json_encode([
    [
        'User' => [
            'title' => '',
            'name' => 'Sander Tuinstra',
            'Project' => [
                'id' => 1,
                'name' => 'Project #1'
            ]
        ]
    ],
    [
        'User' => [
            'title' => 'Geachte mevrouw Tun',
            'name' => 'Mev Tun',
            'Project' => [
                'id' => 2,
                'name' => 'Project #1'
            ]
        ]
    ]
]);
