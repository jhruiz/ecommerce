<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout | Torque Racing</title>
    <link rel="icon" href="assets/images/favicon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/checkout/checkout.css">
</head>
<body>

<nav class="checkout-header mb-4">
    <div class="container d-flex justify-content-between align-items-center">
        <img src="assets/images/torque_logo_dark.jpeg" height="35">
        <span class="secure-text"><i class="fa fa-lock"></i> Pago Seguro</span>
        <a href="index.php" class="back-link">Volver a la tienda</a>
    </div>
</nav>

<div class="container">
    <div class="row">
        <div class="col-lg-7">
            <div class="apple-card">
                <h2 class="step-title"><span>1</span> Información de Envío</h2>
                <div class="client-data-box">
                    <h5 id="check-nombre-cliente" class="font-weight-bold mb-1">Cargando...</h5>
                    <p id="check-direccion-cliente" class="mb-0 text-muted"></p>
                    <p id="check-ciudad-telefono" class="text-muted"></p>
                    <button class="btn-apple-secondary">Cambiar dirección</button>
                </div>
            </div>

            <div class="apple-card mt-4">
                <h2 class="step-title"><span>2</span> Método de Pago</h2>
                <div class="payment-options">
                    <label class="payment-item">
                        <input type="radio" name="metodo_pago" value="wompi" checked>
                        <span class="ml-2">Tarjeta / Nequi / PSE (Wompi)</span>
                    </label>
                    <label class="payment-item">
                        <input type="radio" name="metodo_pago" value="contraentrega">
                        <span class="ml-2">Pago Contra-entrega</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="apple-card sticky-top" style="top: 20px;">
                <h4 class="font-weight-bold mb-4">Resumen de tu pedido</h4>
                
                <div id="checkout-items-list" class="mb-4">
                    </div>

                <div class="summary-totals pt-3">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Subtotal</span>
                        <span id="check-subtotal" class="font-weight-bold"></span> 
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span class="text-muted">Envío</span>
                        <span class="text-success font-weight-bold">Gratis</span>
                    </div>
                    <div class="d-flex justify-content-between total-row pt-3">
                        <span>Total</span>
                        <span id="check-total">$ 0</span>
                    </div>
                </div>

                <button class="btn-apple-primary w-100 mt-4" onclick="procesarPedido()">
                    Finalizar Pedido
                </button>
            </div>
        </div>
    </div>
</div>

<script src="vendor/jquery/jquery.min.js"></script>
<script src="assets/js/general.js"></script>
<script src="assets/js/checkout/checkout.js"></script>
<script type="text/javascript" src="https://checkout.wompi.co/widget.js"></script>
</body>
</html>