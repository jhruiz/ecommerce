<?php 
  $pagina_actual = 'login'; 
  include 'includes/layout/header.php'; 
?>

<div class="login-wrapper">
  <div class="container">
    <div class="apple-login-card">
      <div class="login-header">
        <img src="assets/images/logo.png" alt="" class="login-logo" style="max-width: 150px; height: auto; margin-bottom: 0px;">
        <h2>Iniciar sesión</h2>
        <p>Usa tu cuenta de <span id="nombreEmpresaLogin"></span> para comprar.</p>
      </div>

      <div class="login-body">
        <div class="apple-input-group">
          <input type="text" id="user" placeholder="Usuario" autocomplete="off" required>
        </div>
        
        <div class="apple-input-group">
          <input type="password" id="password" placeholder="Contraseña" autocomplete="off" required>
        </div>

        <div class="login-actions">
          <button class="apple-btn-primary" onclick="loginUser()">Continuar</button>
        </div>

        <div class="login-divider">
          <span>¿No tienes cuenta?</span>
        </div>

        <div class="login-footer-actions">
          <a href="suscription.php" class="apple-link">Crear una ahora</a>
        </div>
      </div>
    </div>
  </div>
</div>

<?php 
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>