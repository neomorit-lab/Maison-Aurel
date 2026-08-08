<?php
declare(strict_types=1);

require __DIR__ . '/config/bootstrap.php';
require __DIR__ . '/includes/modules.php';
require __DIR__ . '/includes/layout.php';

$moduleKey = $_GET['module'] ?? 'dashboard';
if (!isset($adminModules[$moduleKey])) {
    http_response_code(404);
    $moduleKey = 'dashboard';
}

$module = $adminModules[$moduleKey];
require $module['file'];
