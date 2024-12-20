<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="assets/images/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">

    <title>TORQUE RACING S.A.S</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Additional CSS Files -->
    <link rel="stylesheet" href="assets/css/fontawesome.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/owl.css">
    <link rel="stylesheet" href="assets/css/my-orders/my-orders.css">
    <link rel="stylesheet" href="assets/css/whatsapp/whatsapp.css">

  </head>

  <body>

    <!-- ***** Preloader Start ***** -->
    <div id="preloader">
        <div class="jumper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>  
    <!-- ***** Preloader End ***** -->

    <!-- Header -->
    <header class="">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.php"><h2><em>Torque Racing</em></h2></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Inicio
                      <span class="sr-only">(current)</span>
                    </a>
                </li> 
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categorías</a>
                  <div class="dropdown-menu drp-menu-categorias"></div>
                </li>                
                <li class="nav-item"><a class="nav-link" href="about-us.php">Sobre Nosotros</a></li>
                <li class="nav-item"><a class="nav-link" href="#" onclick="goToShopping();">Carrito de compras(<span id="cntItems">0</span>)</a></li>
                <li class="nav-item active pedidos"><a class="nav-link" href="my-orders.php">Mis pedidos</a></li>
                <li class="nav-item"><a class="nav-link" href="login.php">Ingresar</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <div class="" style="">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-content">
              <!-- <h4>Lorem ipsum dolor sit amet</h4>
              <h2>Blog</h2> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="products call-to-action" style="margin-top: 100px;">
      <div class="container-fluid">

        <div class="row">
          <div class="col-md-5">
            <div class="container-fluid">
              <table class="table tblData">
                <thead id="headtable">
                  <tr>              
                    <th scope="col"># Pedido</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody id="det_pedidos"></tbody>
              </table>
            </div>
          </div>
          <!-- <div class="col-md-7 container-fluid" style="background-color: rgb(247, 243, 243); -webkit-border-radius: 7px"> -->
          <div class="col-md-7">
            <div class="container-fluid">

              <div style="margin-bottom: 30px;">
                <h4>Detalles del pedido <span id="num_pedido"></span></h4>
              </div>

              <div class="badge-light time-line" style="border-radius: 3px;">
                <!-- linea de tiempo -->              
              </div>           

              <div class="badge-light" style="border-radius: 3px; margin-bottom: 10px;">
                <!-- Seccion para el resumen del pedido -->
                <div class="col-md-12 text-center" id="subtittle-pedido-ok"></div>
                <table class="table" id="tbl-resumen-pedido" style="margin: 0 auto;">
                  <tbody id="det-res-pedido"></tbody>
                </table>
                <!-- Fin sección para el resumen del pedido -->                
              </div>

              <div class="badge-light" style="border-radius: 3px;">
                <!-- Seccion para el detalle del pedido -->
                <table class="table" style="margin: 0 auto;">
                  <thead id="detHeadtable"></thead>
                  <tbody id="det_pedido"></tbody>
                  <tbody id="det_pago"></tbody>
                </table>                
                <!-- fin seccion para el detalle del pedido -->
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="inner-content">
               <p>Copyright © 2023 Torque Racing S.A.S</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div class="whatsapp-button">
        <a  href="https://wa.me/573008225432?text=¡Hola!%20Me%20interesa%20conocer%20más%20sobre%20sus%20productos." target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo">
        </a>
    </div>

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/mgalante/jquery.redirect@master/jquery.redirect.js"></script>


    <!-- Additional Scripts -->
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/owl.js"></script>
    <script src="assets/js/general.js"></script>
    <script src="assets/js/vallogin.js"></script>
    <script src="assets/js/generalcategorias.js"></script>
    <script src="assets/js/orders/my_orders.js"></script>
  </body>

</html>
