<?php
return [
    'app_name' => 'Maison Aurel Admin',
    'app_env' => 'local',
    'base_url' => '',
    'timezone' => 'Africa/Casablanca',

    'db' => [
        'host' => 'localhost',
        'name' => 'maison_aurel',
        'user' => 'root',
        'pass' => '',
        'charset' => 'utf8mb4',
    ],

    'mail' => [
        'host' => 'smtp.example.com',
        'port' => 587,
        'username' => '',
        'password' => '',
        'from_email' => 'contact@example.com',
        'from_name' => 'Maison Aurel',
    ],

    'integrations' => [
        'google_sheets' => [
            'enabled' => false,
            'spreadsheet_id' => '',
            'credentials_path' => '',
        ],
        'meta_ads' => [
            'enabled' => false,
            'access_token' => '',
            'ad_account_id' => '',
        ],
        'google_analytics' => [
            'enabled' => false,
            'property_id' => '',
            'credentials_path' => '',
        ],
        'whatsapp' => [
            'phone' => '212652563924',
        ],
    ],
];
