<?php 
  include 'includes/layout/header.php'; 
  $id_wompi = isset($_GET['id']) ? $_GET['id'] : 'N/A';
?>

<div class="container text-center" style="margin-top: 150px;">
    <div class="apple-card p-5 mx-auto" style="max-width: 600px;">
        <div class="mb-4">
            <i class="fa fa-clock-o fa-5x text-warning"></i>
        </div>
        <h2 class="font-weight-bold">Transacción en proceso</h2>
        <p class="text-muted">Estamos validando tu pago con Wompi.</p>
        <p class="small text-muted">ID de transacción: <?php echo $id_wompi; ?></p>
        
        <div class="alert alert-info py-2 small">
            Tan pronto Wompi nos confirme, verás el estado actualizado en "Mis Pedidos".
        </div>

        <a href="my-orders.php" class="btn-apple-primary mt-3">Ir a mis pedidos</a>
    </div>
</div>

<?php include 'includes/layout/footer.php'; ?>