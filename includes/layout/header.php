<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="assets/images/favicon.ico">
        <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">

        <title>Torque Racing S.A.S</title>

        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Additional CSS Files -->
        <link rel="stylesheet" href="assets/css/fontawesome.css">
        <link rel="stylesheet" href="assets/css/general.css">
        <link rel="stylesheet" href="assets/css/banner.css">
        <link rel="stylesheet" href="assets/css/footer.css">
        <link rel="stylesheet" href="assets/css/index/index.css">
        <link rel="stylesheet" href="assets/css/whatsapp/whatsapp.css">
        <link rel="stylesheet" href="assets/css/loginsus/login.css">
        <link rel="stylesheet" href="assets/css/loginsus/suscription.css">
        <link rel="stylesheet" href="assets/css/productdetails/product-details.css">
        
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    </head>

    <header class="main-navbar">
        
        <div class="container-fluid px-4">
            <div class="row align-items-center justify-content-between py-2">
                
                <div class="col-auto">
                    <a href="index.php" class="logo-container">
                        <img src="assets/images/torque1.jpeg" alt="Torque Racing">
                    </a>
                </div>

                <div class="col-auto d-none d-xl-block">
                    <nav class="nav-links-wrapper">
                        <a href="index.php" class="nav-item-apple">Inicio</a>
                        <a href="about-us.php" class="nav-item-apple">Sobre nosotros</a>
                        <a href="my-orders.php" class="nav-item-apple">Mis Pedidos</a>
                        <a href="login.php" class="nav-item-apple">Ingresar</a>
                    </nav>
                </div>

                <div class="col-auto d-flex align-items-center">
                    
                    <div class="search-bar-apple mr-3">
                        <input type="text" placeholder="Buscar productos..." id="input_search">
                        <i class="fa fa-search text-muted"></i>
                    </div>

                    <a href="javascript:void(0)" onclick="openCart();" class="cart-icon-wrapper">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span class="apple-cart-badge" id="cntItems">0</span>
                    </a>

                </div>
            </div>
        </div>
    </header>
    <body>

    <div id="cart-overlay" class="cart-overlay" onclick="closeCart()"></div>

    <div id="side-cart" class="side-cart">
        <div class="cart-header">
            <h3>Tu Carrito</h3>
            <button class="close-cart" onclick="closeCart()">&times;</button>
        </div>

        <div class="cart-body" id="cart-items-container">
            <div class="empty-cart-msg">Cargando productos...</div>
        </div>

        <div class="cart-footer">
            <div class="cart-summary">
                <div class="summary-line">
                    <span>Subtotal</span>
                    <span id="cart-subtotal">$ 0</span>
                </div>
                <div class="summary-line">
                    <span>IVA</span>
                    <span id="cart-iva">$ 0</span>
                </div>
                <div class="summary-line total">
                    <span>Total</span>
                    <span id="cart-total">$ 0</span>
                </div>
            </div>
            <button class="btn-apple-checkout" onclick="window.location.href='checkout.php'">
                Finalizar Compra
            </button>
            <button class="btn-continue-shopping" onclick="closeCart()">
                Continuar comprando
            </button>
        </div>
    </div>

    <div id="notificaciones-torque" style="position: fixed; top: 0; left: 0; width: 100vw; height: 0; z-index: 999999999 !important;"></div>

    