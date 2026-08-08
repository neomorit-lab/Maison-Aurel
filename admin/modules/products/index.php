<?php
render_admin_page('Produits', 'products', function (): void { ?>
  <section class="module-grid">
    <article class="module-card"><h2>Fiches produits</h2><p>Nom, description, prix indicatif, image, statut, délai.</p></article>
    <article class="module-card"><h2>SEO produit</h2><p>Title, meta description, image OG et données structurées.</p></article>
    <article class="module-card"><h2>Images</h2><p>Photos réelles, portées, packaging et détails de pierre.</p></article>
    <article class="module-card"><h2>Demandes</h2><p>Produits les plus demandés dans la sélection.</p></article>
  </section>
<?php });
