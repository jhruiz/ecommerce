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
    <link rel="stylesheet" href="assets/css/whatsapp/whatsapp.css">
    <link rel="stylesheet" href="assets/css/checkout/checkout-loader.css">

  </head>

  <body>

    <div id="loader" class="loader-overlay">
        <div class="loader"></div>
        <div class="loader-message">Estamos procesando tu pedido...</div>
    </div>

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
                <li class="nav-item active"><a class="nav-link" href="#" onclick="goToShopping();">Carrito de compras(<span id="cntItems">0</span>)</a></li>
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
              <h2>Checkout</h2> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="products call-to-action" style="margin-top: 100px;">
      <div class="container">
        <div class="inner-content col-md-6">
          <div class="contact-form">
            <span><i class="fa fa-info-circle fa-lg"></i><strong> Información para envío</strong></span>
            <span class="control-label" style="float: right;"><i style="cursor: pointer" class="fa fa-pencil fa-lg" id="editClient" title="Editar información"></i></span><br>
            <span class="control-label" id="nameUser"></span><br>
            <span class="control-label" id="emailUser"></span><br>
            <span class="control-label" id="telUser"></span><br>
            <span class="control-label" id="locUser"></span>
            
          </div>          
        </div>
        <div class="col-md-6">&nbsp;</div>
            
        <br>

        <div class="col-md-12 text-center" id="tittle-pedido-ok"></div>
        <div class="col-md-12 text-center" id="subtittle-pedido-ok"></div>
          
        <table class="table tblData" style="margin: 0 auto;">
          <thead id="headtable">
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">Item</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Vlr. Unit.</th>
              <!-- <th scope="col">% Dcto.</th> -->
              <th scope="col">Imp. %.</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody id="det_pedido"></tbody>
          <tbody id="det_pago"></tbody>          
        </table>

        <div class="col-md-12 text-center" id="email-pedido-ok"></div>
          
        <br>
          
        <button type="button" class="btn btn-primary btn-confirm" onclick="confirmarPedido()">Confirmar pedido</button>
        <div class="container">
          <div class="row float-right">
            <div class="col-md-1" id="wallet_container"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade bd-example-modal-lg" id="formCheckOrder" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formCheckOrderLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>          
          <div class="modal-body">
            <div class="container">
              <table class="table">
                <thead>
                     <tr>
                          <th scope="col">Item</th>
                          <th scope="col">Cantidad pedida</th>
                          <th scope="col">Cantidad disponible</th>
                     </tr>
                </thead>
                <tbody id="det_check_order"></tbody>                
              </table>
            </div> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary bnt-send-units" onclick="actualizarUnidadesPedidasExistencia()">Enviar unidades existentes</button>            
          </div>          
        </div>
      </div>      
    </div>


    <div class="modal fade bd-example-modal-lg" id="formEditClient" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Actualizar información</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>          
          <div class="modal-body">
            <div class="container">
              <div class="col-md-12">
                <div class="contact-form">
                  <div class="row" id="form-suscription">

                    <div class="row col-lg-12 col-md-12 col-sm-12">
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Nombres</label>
                          <input name="name" type="text" class="form-control" id="name" readonly>
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Apellidos</label>
                          <input name="lastnames" type="text" class="form-control" id="lastnames" readonly>
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Identificación</label>
                          <input name="identification" type="text" class="form-control" id="identification" readonly>
                        </fieldset>
                      </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12">
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                         <label>Pais</label>
                          <select name="countries" class="form-control" id="countries" onchange="obtenerDepartamentosXPais()"></select>
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                         <label>Departamento</label>
                          <select name="dptos" class="form-control" id="dptos" onchange="obtenerCiudades(null, null)"></select>
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Ciudad</label>
                          <select name="cities" class="form-control" id="cities" ></select>
                        </fieldset>
                      </div>
                    </div>

                    <div class="row col-lg-12 col-md-12 col-sm-12">
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Correo</label>
                          <input name="email" type="text" class="form-control" id="email">
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Dirección</label>
                          <input name="direction" type="text" class="form-control" id="direction">
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Teléfono</label>
                          <input name="telephone" type="text" class="form-control" id="telephone">
                        </fieldset>
                      </div>
                      <div class="col-lg-3 col-md-3 col-sm-3">
                        <fieldset>
                          <label>Celular</label>
                          <input name="cellphone" type="text" class="form-control" id="cellphone">
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class="modal-footer">
            <button type="button" id="updateClient" class="btn btn-primary bnt-send-units" onclick="actualizarDataCliente()">Actualizar</button>            
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
    <script src="assets/js/checkout/checkout.js"></script>
    <script src="assets/js/checkout/updateuser.js"></script>    
    <script src="assets/js/checkout/loader.js"></script>    

  </body> 

</html>
