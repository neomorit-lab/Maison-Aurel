<?php
render_admin_page('Gestion du stock', 'stock', function (): void { ?>
  <section class="module-grid">
    <article class="module-card"><h2>Pierres</h2><p>Saphir, rubis, émeraude, diamant labo : disponibilité, dimensions, statut.</p></article>
    <article class="module-card"><h2>Bijoux</h2><p>Pièces disponibles, réservées, vendues ou sur demande.</p></article>
    <article class="module-card"><h2>Alertes</h2><p>Stock faible, pièce réservée, demande urgente.</p></article>
    <article class="module-card"><h2>Traçabilité</h2><p>Fiche, certificat, notes internes et images réelles.</p></article>
  </section>
<?php });
