<?php 
  $pagina_actual = 'suscription'; 
  include 'includes/layout/header.php'; 
?>

<div class="registration-wrapper">
    <div class="container">
        <div class="apple-form-card">
            <div class="form-header">
                <h2>Crea tu cuenta</h2>
                <p>Únete a la comunidad de Torque Racing y gestiona tus pedidos fácilmente.</p>
            </div>

            <form id="form-suscription" class="apple-form">
                <div class="form-section">
                    <h3 class="section-subtitle">Información Personal</h3>
                    <div class="apple-row">
                        <div class="apple-group">
                            <input name="name" type="text" id="name" placeholder="Nombres*" required>
                        </div>
                        <div class="apple-group">
                            <input name="lastnames" type="text" id="lastnames" placeholder="Apellidos*" required>
                        </div>
                    </div>
                    <div class="apple-row">
                        <div class="apple-group">
                            <input name="identification" type="text" id="identification" placeholder="Identificación*" required>
                        </div>
                        <div class="apple-group">
                            <input name="email" type="email" id="email" placeholder="Correo electrónico*" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3 class="section-subtitle">Ubicación de entrega</h3>
                    <div class="apple-row three-cols">
                        <div class="apple-group">
                            <select name="countries" id="countries" required>
                                <option value="" disabled selected>País*</option>
                            </select>
                        </div>
                        <div class="apple-group">
                            <select name="dptos" id="dptos" required>
                                <option value="" disabled selected>Departamento*</option>
                            </select>
                        </div>
                        <div class="apple-group">
                            <select name="cities" id="cities" required>
                                <option value="" disabled selected>Ciudad*</option>
                            </select>
                        </div>
                    </div>
                    <div class="apple-group full-width">
                        <input name="direction" type="text" id="direction" placeholder="Dirección exacta (Calle, Carrera, Apto)*">
                    </div>
                </div>

                <div class="form-section">
                    <h3 class="section-subtitle">Contacto</h3>
                    <div class="apple-row">
                        <div class="apple-group">
                            <input name="telephone" type="text" id="telephone" placeholder="Teléfono fijo">
                        </div>
                        <div class="apple-group">
                            <input name="cellphone" type="text" id="cellphone" placeholder="Celular*">
                        </div>
                    </div>
                </div>

                <div class="form-footer">
                    <p class="terms-text">Al suscribirte, aceptas nuestros <a href="#">Términos y Condiciones</a>.</p>
                    <button type="button" class="apple-btn-primary" id="subscribe" onclick="suscribirse()">
                        Registrarme ahora
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>