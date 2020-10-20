// almacena los productos añadidos al carrito
var shopping_cart = []

// Incrementa el contador del artículo
function counter(nombre,precio,art,step,origen){
    var $input = $('#'+ origen + 'art_' + art);
    unidades = parseInt($input.val());
    //console.log("unidades: " + unidades);
    if ((parseInt($input.val())+step)>=0) {
        shopping_manage_unit(nombre,precio,art,unidades,step)
        $input.val(parseInt($input.val()) + step);
        replicar_counter(art,$input.val())
    }
    console.log(shopping_cart)
}

function replicar_counter(art,value){
    //console.log(art + "," + value);
    var mirror_list = ['cart_','']
    for (var i = 0; i < mirror_list.length; i++) {
        $('#' + mirror_list[i] + 'art_' + art ).val(value);
        //console.log("upd: " + '#' + mirror_list[i] + 'art_' + art )
    }
}

// Añade la cantidad paso a paso al arreglo del carrito
function shopping_manage_unit(nombre,precio,art,unidades,step){
    var encontrado = false;
    for (var i = 0; i < shopping_cart.length; i++) {
        if (shopping_cart[i].art == art) {
            shopping_cart[i].cant = parseInt(unidades+step)
            if (shopping_cart[i].cant == 0) {
                shopping_cart.splice(i,1)
            }
            encontrado=true;
        }
    }
    if (!encontrado) {
        shopping_cart.push({'art': art, 'nombre': nombre, 'precio' : precio, 'cant': unidades+step})
    }
    // Añade o resta cantidades al badget del carrito
    $("#cart_badge").text(shopping_cart.length)
}

//muestra el modal con el detalle del artículo
function ver_detalle_articulo(nombre,precio,art,cant){
    console.log(nombre+","+precio+","+art+","+cant);
    modal_articulo_nombre
    $('#modal_articulo').modal();

    document.getElementById('modal_articulo_nombre').innerHTML = "<p><b>" + nombre + "</b></p>"
    document.getElementById('modal_articulo_img').innerHTML = "<img src='imagenes/img_art_" + art + ".jpg' class='img-fluid' alt='Responsive image'>";
    document.getElementById('modal_articulo_precio').innerHTML = formatMoney(precio) + " c/u";
    //cell3.appendChild(document.getElementById('div_art_'+shopping_cart[i].art));
    document.getElementById('modal_div_art').innerHTML = "<div class='input-group mb-3 input-group-sm' id='div_cart_art_1' align='center'> \
                                                                    <div class='input-group-prepend'> \
                                                                        <button class='btn btn-outline-secondary' type='button' onclick='counter(\"" + nombre + "\"," + precio + "," + art + ",-1,\"\");ver_carrito()'> \
                                                                            <i class='fa fa-minus-circle'></i> \
                                                                        </button> \
                                                                   </div> \
                                                                   <input type='text' class='form-control input_art' onchange='counter(\"" + nombre + "\"," + precio + "," + art + ",0,\"cart_\");ver_carrito()' value='" + cant + "' align='center' id='cart_art_" + art + "'> \
                                                                   <div class='input-group-append'> \
                                                                        <button class='btn btn-outline-secondary' type='button' onclick='counter(\"" + nombre + "\"," + precio + "," + art + ",1,\"\");ver_carrito()'> \
                                                                            <i class='fa fa-plus-circle'></i> \
                                                                        </button> \
                                                                   </div> \
                                                               </div>"
}

//muestra el contenido del carrito
function ver_carrito(){
    mostrar('carrito')
    var table = document.getElementById("carrito_tabla");
    $('#carrito_tabla').html('')
    for (var i = shopping_cart.length - 1; i >= 0; i--) {
        var art = shopping_cart[i].art;
        var nombre = shopping_cart[i].nombre;
        var precio = shopping_cart[i].precio;
        var cant =  shopping_cart[i].cant;

        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = "<p><b>" + nombre + "</b></p><img src='imagenes/img_art_" + art + ".jpg' alt='Nature' class='responsive-image' width='30' height='20' onclick='ver_detalle_articulo(\"" + nombre + "\"," + precio + ", " + art + ", " + cant + ")'' style='cursor: pointer;'>";
        cell2.innerHTML = formatMoney(precio);
        //cell3.appendChild(document.getElementById('div_art_'+art));
        cell3.innerHTML = "<div class='input-group mb-3 input-group-sm' id='div_cart_art_1' style='width: 50%; padding-top: 5%;' align='center'> \
                                <div class='input-group-prepend'> \
                                    <button class='btn btn-outline-secondary' type='button' onclick='counter(\"" + nombre + "\"," + precio + "," + art + ",-1,\"\");ver_carrito()'> \
                                        <i class='fa fa-minus-circle'></i> \
                                    </button> \
                               </div> \
                               <input type='text' class='form-control input_art' onchange='counter(\"" + nombre + "\"," + precio + "," + art + ",0,\"cart_\");ver_carrito()' value='" + cant + "' align='center' id='cart_art_" + art + "'> \
                               <div class='input-group-append'> \
                                    <button class='btn btn-outline-secondary' type='button' onclick='counter(\"" + nombre + "\"," + precio + "," + art + ",1,\"\");ver_carrito()'> \
                                        <i class='fa fa-plus-circle'></i> \
                                    </button> \
                               </div> \
                           </div>"
        cell4.innerHTML =  formatMoney(precio*cant);
        cell5.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    }

    //ajuste de la alineación vertical y horizontal
    var c = document.getElementById("carrito_tabla");
    for (var i = 0; i < c.rows.length; i++) {
        for (var j = 0; j < c.rows[i].cells.length; j++) {
            c.rows[i].cells[j].style.verticalAlign = "middle";
            c.rows[i].cells[j].style.textAlign = "center";
        }
    }

    calcularTotalPagar()

}

function calcularTotalPagar() {
    //console.log("ok");
    var total_pagar = 0
    for (var i = 0; i < shopping_cart.length; i++) {
        total_pagar = total_pagar + shopping_cart[i].precio * shopping_cart[i].cant
    }
    //console.log(total_pagar);
    $('#shopping_cart_total').html(formatMoney(total_pagar));
}

function IrATienda(){
    mostrar('tienda')
    document.getElementById("carrito_tabla").innerHTML=""
}

//Función para mostrar el div requerido
function mostrar(div_id){
  $('#tienda').hide(500);
  $('#carrito').hide(500);
  $('#'+div_id).show(500);  
}

//
function Registro(){
    $('#signin').hide(500);
    $('#signup').show(500);     
}

//Función para mostrar el valor numérico en formato moneda
function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "$ ";
    var fixedNum = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  
    thouCount = 0
    var thouNum = ""
    for (var i = fixedNum.length-1; i >= 0; i--) {
        if (thouCount == 3) {
            thouNum = thouSep + thouNum;    
            thouCount = 0;
        }
        thouNum = fixedNum.charAt(i) + thouNum;
        thouCount++
    }

    return sign + thouNum + decSep + "00"
}

