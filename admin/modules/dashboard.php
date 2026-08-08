<?php
render_admin_page('Dashboard', 'dashboard', function (): void {
    $cards = [
        ['label' => 'Leads à traiter', 'value' => '0', 'note' => 'À connecter au CRM'],
        ['label' => 'Demandes sélection', 'value' => '0', 'note' => 'À connecter à PHPMailer/DB'],
        ['label' => 'Campagnes actives', 'value' => '0', 'note' => 'À connecter au module Ads'],
        ['label' => 'Articles publiés', 'value' => '12+', 'note' => 'À synchroniser avec le contenu'],
    ];
    ?>
    <section class="metric-grid">
        <?php foreach ($cards as $card): ?>
            <article class="metric-card">
                <span><?= e($card['label']) ?></span>
                <strong><?= e($card['value']) ?></strong>
                <p><?= e($card['note']) ?></p>
            </article>
        <?php endforeach; ?>
    </section>
    <section class="admin-panel">
        <h2>Priorités admin</h2>
        <ol>
            <li>Créer la table des leads et connecter les formulaires.</li>
            <li>Ajouter authentification admin.</li>
            <li>Brancher PHPMailer et sauvegarde DB.</li>
            <li>Connecter tracking des CTA et campagnes.</li>
        </ol>
    </section>
    <?php
});
