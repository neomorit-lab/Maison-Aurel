<?php
render_admin_page('CRM', 'crm', function (): void { ?>
  <section class="module-grid">
    <article class="module-card"><h2>Prospects</h2><p>Demandes depuis formulaire, sélection, WhatsApp, Ads et newsletter.</p></article>
    <article class="module-card"><h2>Suivi client</h2><p>Statut : nouveau, contacté, devis envoyé, gagné, perdu, relance.</p></article>
    <article class="module-card"><h2>Fiche demande</h2><p>Nom, téléphone, ville, budget, occasion, intention, produits demandés.</p></article>
    <article class="module-card"><h2>Relances</h2><p>Dates de rappel et notes internes.</p></article>
  </section>
<?php });
