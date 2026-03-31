<?php 
$pagina_actual = 'about-us'; 
include 'includes/layout/header.php'; 
?>
<section class="about-section py-5">
    <div class="container">
        <div class="row align-items-center mb-5">
            <div class="col-md-6">
                <h6 class="text-primary-apple mb-2">Nuestra Esencia</h6>
                <h2 class="section-title-apple">Impulsando la pasión las motos</h2>
                <p class="about-text mt-4">
                    En <strong>Torque Racing</strong>, nacimos de la necesidad de ofrecer herramientas de alto rendimiento para los amantes de la mecánica en Cali y toda Colombia. 
                    Nuestra misión es conectar la precisión técnica con la facilidad de compra digital.
                </p>
                <div class="about-stats d-flex mt-4">
                    <div class="stat-item mr-4">
                        <span class="stat-number">+10</span>
                        <span class="stat-label">Años de experiencia</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">200+</span>
                        <span class="stat-label">Reseñas positivas</span>
                    </div>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <img src="assets/images/taller.webp" class="img-fluid rounded-apple shadow-lg" alt="Oficina Torque Racing">
            </div>
        </div>

        <hr class="apple-divider">

        <div class="row mt-5">
            <div class="col-md-7">
                <div class="map-container-apple">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.62583115204!2d-76.53878018260002!3d3.4408516044452657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a68acde75895%3A0x53a838e508e939c!2sTORQUE%20RACING!5e0!3m2!1ses!2sco!4v1682643517302!5m2!1ses!2sco" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
            <div class="col-md-5 pl-md-5">
                <h3 class="footer-subtitle mt-3">Dónde encontrarnos</h3>
                <p class="text-muted small">Visítanos en nuestro punto de atención principal en Cali.</p>
                
                <div class="contact-card-apple mt-4">
                    <div class="contact-item">
                        <i class="fa fa-map-marker"></i>
                        <span>Cra. 16 #10-63, Bretaña, Cali, Valle del Cauca</span>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-clock-o"></i>
                        <span>Lun - Sáb: 8:00 AM - 6:00 PM</span>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-envelope-o"></i>
                        <span>ventas@torqueracing.com</span>
                    </div>
                </div>

                <div class="social-pills-apple mt-4">
                    <a href="#" class="social-pill"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="social-pill"><i class="fa fa-instagram"></i></a>
                    <a href="#" class="social-pill"><i class="fa fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>
