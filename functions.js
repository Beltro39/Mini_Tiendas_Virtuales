// almacena los productos añadidos al carrito
var shopping_cart = []

// Incrementa el contador del artículo
function counter(art,step){
    var $input = $('#art_'+art);
    unidades = parseInt($input.val());
    console.log(unidades);
    if ((parseInt($input.val())+step)>=0) {
        shopping_manage_unit(art,unidades,step)
        $input.val(parseInt($input.val()) + step);
        replicar_counter(art,$input.val())
    }
    console.log(shopping_cart)
}

function replicar_counter(art,value){
    console.log('ok');
    var mirror_list = ['main_modal_','cart_','']
    for (var i = 0; i < mirror_list.length; i++) {
        $('#' + mirror_list[i] + 'art_' + art ).val(value);
    }

}

// Añade la cantidad paso a paso al arreglo del carrito
function shopping_manage_unit(art,unidades,step){
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
        shopping_cart.push({art: art,cant: unidades+step})
    }
    // Añade o resta cantidades al badget del carrito
    $("#cart_badge").text(shopping_cart.length)
}

//muestra el contenido del carrito
function ver_carrito(){
    mostrar('carrito')
    var table = document.getElementById("carrito_tabla");
    $('#carrito_tabla').html('')
    for (var i = shopping_cart.length - 1; i >= 0; i--) {
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = shopping_cart[i].art;
        cell1.innerHTML = "<p><b>Choco Break</b></p><img src='imagenes/img2.jpg' alt='Nature' class='responsive-image' width='30' height='20'>";
        cell2.innerHTML = '$ 200';
        //cell3.appendChild(document.getElementById('div_art_'+shopping_cart[i].art));
        cell3.innerHTML = "<div class='input-group mb-3 input-group-sm' id='div_cart_art_1' style='width: 50%' align='center'> \
                           <div class='input-group-prepend'><button class='btn btn-outline-secondary' type='button' onclick='counter(" + shopping_cart[i].art + ",-1)'> \
                           <i class='fa fa-minus-circle'></i></button></div><input type='text' class='form-control input_art' onchange='counter(1,0);' id='cart_art_" + shopping_cart[i].art + "' value='" + shopping_cart[i].cant + "' align='center'> \
                           <div class='input-group-append'><button class='btn btn-outline-secondary' type='button' onclick='counter(" + shopping_cart[i].art + ",1)'> \
                           <i class='fa fa-plus-circle'></i></button></div></div>"
        cell4.innerHTML = shopping_cart[i].cant;
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