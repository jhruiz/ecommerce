<?php 
  $pagina_actual = 'gracias'; 
  include 'includes/layout/header.php'; 

  // Capturamos el número de pedido de la URL
  $order_id = isset($_GET['order']) ? $_GET['order'] : 'N/A';
?>

<div class="container text-center" style="margin-top: 30px; margin-bottom: 100px;">
    <div class="apple-card p-5 mx-auto" style="max-width: 600px;">
        <div class="mb-4">
            <i class="fa fa-check-circle fa-5x text-success"></i>
        </div>
        
        <h1 class="font-weight-bold mb-3">¡Gracias por tu compra!</h1>
        <p class="text-muted mb-4" style="font-size: 1.1rem;">
            Tu pedido <span class="font-weight-bold text-dark">#<?php echo $order_id; ?></span> ha sido recibido con éxito bajo la modalidad de <strong>Pago Contra Entrega</strong>.
        </p>

        <div class="bg-light p-4 rounded-lg mb-4 text-left" style="border-radius: 15px;">
            <h6 class="font-weight-bold"><i class="fa fa-truck"></i> ¿Qué sigue ahora?</h6>
            <ul class="small text-muted mt-2 pl-3">
                <li>Estamos validando la disponibilidad de tus productos.</li>
                <li>Te contactaremos al celular registrado para confirmar el envío.</li>
                <li>Recuerda tener el dinero en efectivo listo al momento de recibir.</li>
            </ul>
        </div>

        <div class="d-flex flex-column flex-md-row justify-content-center" style="gap: 15px;">
            <a href="my-orders.php" class="btn-apple-primary px-4">Seguir mi pedido</a>
            <a href="index.php" class="btn-apple-secondary px-4">Volver a la tienda</a>
        </div>
    </div>
</div>

<?php  
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>