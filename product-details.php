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
    <link rel="stylesheet" href="assets/css/productdetails/product-details.css">
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
                <li class="nav-item active">
                    <a class="nav-link" href="index.php">Inicio
                      <span class="sr-only">(current)</span>
                    </a>
                </li> 
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categorías</a>
                  <div class="dropdown-menu drp-menu-categorias"></div>
                </li>                
                <li class="nav-item"><a class="nav-link" href="about-us.php">Sobre nosotros</a></li>                
                <li class="nav-item"><a class="nav-link" href="#" onclick="goToShopping();">Carrito de compras(<span id="cntItems">0</span>)</a></li>
                <li class="nav-item pedidos"><a class="nav-link" href="my-orders.php">Mis pedidos</a></li>
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
              <h2>Product Details</h2> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="products" style="margin-top: 100px;">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4" id="sec_images">
              </div>             
              <div class="col-md-8" id="ppal_image"> 
              </div>
            </div>          
          </div>

          <div class="col-md-6">
            
            <h2 id="tituloPpal"></h2>
            <p class="lead">              
              <strong id="codItem"></strong>
            </p>
            <p class="lead">              
              <strong id="referencia"></strong>              
            </p>
            <p class="lead">
              <strong id="unidadFactor"></strong>
            </p>

            <br>

            <div id="delPrice"></div>
            
            <p class="lead">
              <strong class="text-primary" id="precioPpal"></strong>
            </p>

            <br>

            <p class="lead" id="descripcionPpal">
            </p>

            <br> 

            <div class="row">
              <div class="col-sm-12">
                <label class="control-label">Cantidad</label>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input type="text" id="uniFactor" class="form-control" value="" style="color: #c0bcbc;" onblur="restaurarUniFactor()" pattern="[0-9]+" onkeyup="validarNumeros()">                  
                      <input type="hidden" id="uniFactorHid" value="">
                      <input type="hidden" class="form-control" val="" id="codHid">
                      <input type="hidden" class="form-control" val="" id="descHid">
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <button type="button" class="btn btn-primary" onclick="salvarAlCarrito()">Agregar al carrito <i class="fa fa-shopping-cart fa-lg"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="latest-products">
      <div class="container">
        <div class="row">

          <div class="col-md-12">
            <div class="section-heading">
              <h2>También te puede interesar</h2>
            </div>
          </div>

          <div class="row" id="imgGrupos">
          </div>

        </div>
      </div>
    </div>

    <div class="modal fade" id="formAgregarItem" tabindex="-1" role="dialog" aria-labelledby="formAgregarItemLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formAgregarItemLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                
                <div class="col-md-5">
                  <div id="ppal_image_modal"></div>
                </div>                

                <div class="form-group col-md-7">
                  <strong id="codModal"></strong><br>                              
                  <strong id="referenciaModal"></strong><br>                              
                  <strong id="unidadFactorModal"></strong>                
                  <div id="delPriceModal"></div>
                  <p class="lead">
                    <strong class="text-primary" id="precioPpalModal"></strong>
                  </p>

                  <label for="recipient-name" class="col-form-label">Cantidad:</label>
                  <input type="text" class="form-control" val="" id="uniFactorModal" style="color: #c0bcbc;" onblur="restaurarUniFactorDetalle()" pattern="[0-9]+" onkeyup="validarNumerosDetalle()">
                  <input type="hidden" class="form-control" val="" id="uniFactorHidModal">
                  <input type="hidden" class="form-control" val="" id="codHidModal">
                  <input type="hidden" class="form-control" val="" id="descHidModal">
                </div>              

              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="salvarAlCarritoModal()">Agregar al carrito <i class="fa fa-shopping-cart fa-lg"></i></button>
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
    <script src="assets/js/zoom/jquery.elevatezoom.js"></script>


    <!-- Additional Scripts -->
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/owl.js"></script>
    <script src="assets/js/general.js"></script>
    <script src="assets/js/vallogin.js"></script>
    <script src="assets/js/generalcategorias.js"></script>
    <script src="assets/js/pdrdetails/details.js"></script>
    <script src="assets/js/pdrdetails/recomendados.js"></script>
    <script src="assets/js/carrito/carrito.js"></script>

  </body>

</html>
