<?php 
  // Configuraciones iniciales si las necesitas
  $pagina_actual = 'inicio'; 
  include 'includes/layout/header.php'; 
?>

<div class="products py-5">
    <div class="container">
        <div class="row" id="prods_availables">
            </div>

        <div class="row mt-5">
            <div class="col-md-12">
                <ul class="apple-pagination" id="ul_paginator">
                    </ul>
            </div>
        </div>
    </div>
</div>

<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>