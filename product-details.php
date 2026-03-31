<?php 
  // Configuraciones iniciales si las necesitas
  $pagina_actual = 'inicio'; 
  include 'includes/layout/header.php'; 
?>

<div class="product-details-wrapper">
    <div class="container">
        <div class="row">
            <div class="col-lg-7 col-md-12">
                <div class="apple-gallery-container">
                    <div class="thumbnails-side" id="sec_images">
                        </div>
                    <div class="main-image-viewport" id="ppal_image">
                        </div>
                </div>
            </div>

            <div class="col-lg-5 col-md-12">
              <div class="product-info-sticky">
                  <div id="urgencia_container"></div>

                  <span class="category-label" id="referencia"></span>
                  <h1 class="product-main-title" id="tituloPpal"></h1>
                  <span class="product-code" id="codItem"></span>
                  
                  <div class="price-container">
                      <div id="delPrice" class="old-price"></div>
                      <h2 class="current-price" id="precioPpal"></h2>
                      
                      <div id="social_proof_container"></div>
                  </div>

                  <div id="descripcionPpal"></div>

                  <div class="purchase-section">
                      <div class="quantity-selector">
                          <label for="uniFactor">Cantidad</label>
                          <input type="text" id="uniFactor" value="1" pattern="[0-9]+">
                      </div>
                      
                      <button type="button" class="btn-apple-buy" onclick="salvarAlCarrito()">
                          Añadir al carrito
                      </button>
                  </div>

                  <div class="product-trust-badges">
                      <p><i class="fa fa-truck"></i> Envío rápido a todo el país</p>
                      <p><i class="fa fa-shield"></i> Garantía oficial Torque Racing</p>
                  </div>
              </div>
            </div>
        </div>
        <div class="latest-products" style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 40px;">
            <div class="container">
                <div class="section-heading" style="margin-bottom: 30px;">
                    <h2 style="font-size: 24px; font-weight: 600;">También te puede interesar</h2>
                </div>
                <div class="row" id="imgGrupos">
                    </div>
            </div>
        </div>
    </div>
</div>
<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>
  
<script src="assets/js/zoom/jquery.elevatezoom.js"></script>
<script src="assets/js/pdrdetails/details.js"></script>
