<?php
declare(strict_types=1);

require __DIR__ . '/../config/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

// TODO next step: protect with admin auth or cron token.
$jobs = [
    ['key' => 'leads_to_sheets', 'label' => 'Leads vers Google Sheets', 'status' => 'planned'],
    ['key' => 'ads_import', 'label' => 'Import Meta/Google Ads', 'status' => 'planned'],
    ['key' => 'analytics_import', 'label' => 'Import Analytics', 'status' => 'planned'],
    ['key' => 'products_export', 'label' => 'Export produits site', 'status' => 'planned'],
];

echo json_encode(['ok' => true, 'jobs' => $jobs]);
