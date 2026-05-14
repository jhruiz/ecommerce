<?php 
$pagina_actual = 'about-us'; 
include 'includes/layout/header.php'; 
?>
<section class="about-section py-5">
    <div class="container">
        <div class="row align-items-center mb-5">
            <div class="col-md-6">
                <h6 class="text-primary-apple mb-2">Nuestra Esencia</h6>
                <h2 class="section-title-apple" id="about_us_titulo"></h2>
                <p class="about-text mt-4" id="about_us_descripcion"></p>
            </div>
            <div class="col-md-6 text-center">
                <img src="assets/images/img_empresa.webp" class="img-fluid rounded-apple shadow-lg" alt="">
            </div>
        </div>

        <hr class="apple-divider">

        <div class="row mt-5">
            <div class="col-md-7">
                <div class="map-container-apple">
                    <iframe src="" id="google-location" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
            <div class="col-md-5 pl-md-5">
                <h3 class="footer-subtitle mt-3">Dónde encontrarnos</h3>
                <p class="text-muted small" id="donde_encontrarnos"></p>
                
                <div class="contact-card-apple mt-4">
                    <div class="contact-item">
                        <i class="fa fa-map-marker"></i>
                        <span id="map-marker"></span>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-clock-o"></i>
                        <span id="schedule"></span>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-envelope-o"></i>
                        <span id="saleemail"></span>
                    </div>
                </div>

                <div class="social-pills-apple mt-4">
                    <a href="#" id="pill-facebook" class="social-pill" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a href="#" id="pill-instagram" class="social-pill" target="_blank"><i class="fa fa-instagram"></i></a>
                    <a href="#" id="pill-linkedin" class="social-pill" target="_blank"><i class="fa fa-linkedin"></i></a>
                    <a href="#" id="pill-youtube" class="social-pill" target="_blank"><i class="fa fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
  ?>

<script src="assets/js/aboutus/aboutus.js"></script>
