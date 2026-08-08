<?php
render_admin_page('Synchronisations & APIs', 'sync', function (): void { ?>
  <section class="module-grid">
    <article class="module-card"><h2>Connecteurs</h2><p>PHPMailer, WhatsApp links, Google Sheets, Meta Ads, Google Analytics, réseaux sociaux et futur ERP/stock.</p></article>
    <article class="module-card"><h2>Jobs de synchronisation</h2><p>Importer leads, pousser newsletter, synchroniser produits, lire campagnes Ads et consolider KPI.</p></article>
    <article class="module-card"><h2>API interne</h2><p>Endpoints pour recevoir formulaires, sélection, tracking, newsletter et événements campagne.</p></article>
    <article class="module-card"><h2>Logs & erreurs</h2><p>Suivi des appels API, statuts, réponses, erreurs et relances automatiques.</p></article>
  </section>
  <section class="admin-panel">
    <h2>Endpoints prévus</h2>
    <ol>
      <li><code>api/leads.php</code> : reçoit contact, sélection et demandes Ads.</li>
      <li><code>api/newsletter.php</code> : reçoit les inscriptions newsletter.</li>
      <li><code>api/tracking.php</code> : reçoit les événements de conversion.</li>
      <li><code>api/sync.php</code> : lance ou liste les jobs de synchronisation.</li>
    </ol>
  </section>
<?php });
