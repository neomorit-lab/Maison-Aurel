<?php
function render_admin_page(string $title, string $activeModule, callable $content): void
{
    require __DIR__ . '/modules.php';
    ?>
    <!doctype html>
    <html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?= e($title) ?> - <?= e(admin_config('app_name', 'Maison Aurel Admin')) ?></title>
        <link rel="stylesheet" href="<?= e(admin_url('public/css/admin.css')) ?>">
    </head>
    <body>
        <aside class="admin-sidebar">
            <a class="admin-brand" href="<?= e(admin_url('index.php')) ?>">Maison Aurel</a>
            <nav>
                <?php foreach ($adminModules as $key => $module): ?>
                    <a class="<?= $key === $activeModule ? 'active' : '' ?>" href="<?= e(admin_url('index.php?module=' . $key)) ?>">
                        <?= e($module['label']) ?>
                    </a>
                <?php endforeach; ?>
            </nav>
        </aside>
        <main class="admin-main">
            <header class="admin-topbar">
                <div>
                    <span class="eyebrow">Administration</span>
                    <h1><?= e($title) ?></h1>
                </div>
                <a class="btn" href="../index.html" target="_blank" rel="noopener">Voir le site</a>
            </header>
            <?php $content(); ?>
        </main>
    </body>
    </html>
    <?php
}
