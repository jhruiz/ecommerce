<?php 
  $pagina_actual = 'inicio'; 
  include 'includes/layout/header.php'; 
?>

<style>
/* CSS CRÍTICO PARA EL DISEÑO */
.apple-card { background: #fff; border-radius: 16px; border: 1px solid #eee; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px; overflow: hidden; }
.trpedido { cursor: pointer; transition: 0.2s; }
.trpedido:hover { background: #f9f9f9; }
.table-active-miggoshop { background-color: #e8f2ff !important; border-left: 4px solid #007aff; }

/* Timeline Horizontal */
.timeline-apple { display: flex !important; justify-content: space-between; list-style: none; padding: 0; margin: 40px 0; position: relative; width: 100%; }
.timeline-apple::before { content: ''; position: absolute; top: 20px; left: 10%; right: 10%; height: 2px; background: #eee; z-index: 1; }
.timeline-apple li { flex: 1; text-align: center; position: relative; z-index: 2; }
.timeline-apple li .icon { width: 40px; height: 40px; background: #fff; border: 2px solid #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; color: #ccc; }
.timeline-apple li.active .icon { background: #007aff; border-color: #007aff; color: #fff; }
.timeline-apple li .text { font-size: 12px; color: #999; display: block; }
.timeline-apple li.active .text { color: #333; font-weight: bold; }
</style>

<div class="products call-to-action" style="margin-top: 120px; min-height: 90vh; background-color: #fbfbfb;">
    <div class="container-fluid" style="padding: 0 50px;">
        <div class="row">
            
            <div class="col-lg-4 col-md-5">
                <div class="apple-card">
                    <div class="p-3 border-bottom"><h5 class="mb-0 font-weight-bold">Mis Pedidos</h5></div>
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th># Pedido</th>
                                    <th>Estado</th>
                                    <th class="text-right">Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="det_pedidos">
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 col-md-7">
                <div id="wrapper-detalle" class="apple-card" style="min-height: 500px;">
                    
                    <div id="instruccion-seleccion" class="p-5 text-center" style="display: flex; flex-direction: column; justify-content: center; min-height: 500px;">
                        <i class="fa fa-search fa-3x text-muted mb-3" style="opacity: 0.2;"></i>
                        <h5 class="text-muted">Selecciona un pedido para ver el detalle</h5>
                    </div>

                    <div id="info-pedido-dinamica" style="display: none;" class="p-5">
                        <h4 class="font-weight-bold mb-4">Orden <span id="num_pedido" class="text-primary"></span></h4>
                        
                        <div class="time-line mb-5"></div> <div class="row mb-4">
                            <div class="col-md-12">
                                <h6 class="font-weight-bold border-bottom pb-2">Resumen</h6>
                                <table class="table table-sm table-borderless">
                                    <tbody id="det-res-pedido"></tbody>
                                </table>
                            </div>
                        </div>

                        <h6 class="font-weight-bold mb-3">Productos</h6>
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th>Producto</th>
                                    <th class="text-center">Cant.</th>
                                    <th class="text-right">Unitario</th>
                                    <th class="text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="det_pedido"></tbody>
                            <tfoot id="det_pago"></tfoot>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<?php  
  include 'includes/layout/whatsapp.php'; 
  include 'includes/layout/footer.php'; 
?>
<script src="assets/js/orders/my_orders.js"></script>