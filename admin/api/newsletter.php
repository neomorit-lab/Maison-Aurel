<?php
declare(strict_types=1);

require __DIR__ . '/../config/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input') ?: '[]', true);
if (!is_array($payload) || empty($payload['email'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Email required']);
    exit;
}

// TODO next step: persist subscriber in DB and optional double opt-in.
echo json_encode(['ok' => true, 'message' => 'Newsletter endpoint ready']);
