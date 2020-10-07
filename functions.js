// almacena los productos añadidos al carrito
var shopping_cart = []

// Incrementa el contador del artículo
function counter(art,step){
    var $input = $('#art_'+art);
    unidades = $('#art_'+art).val();
    if ((parseInt($input.val())+step)>=0) {
        shopping_manage_unit(art,step)
        $input.val(parseInt($input.val()) + step);
    }
    console.log(shopping_cart)
}

// Añade la cantidad deseada al arreglo del carrito
function shopping_manage_unit(art,step){
    var encontrado = false;
    for (var i = 0; i < shopping_cart.length; i++) {
        if (shopping_cart[i].art == art) {
            shopping_cart[i].cant = parseInt(shopping_cart[i].cant+step)
            if (shopping_cart[i].cant == 0) {
                shopping_cart.splice(i,1)
            }
            encontrado=true;
        }
    }
    if (!encontrado) {
        shopping_cart.push({art: art,cant: step})
    }
    // Añade o resta cantidades al badget del carrito
    $("#cart_badge").text(shopping_cart.length)
}

//muestra el contenido del carrito
function ver_carrito(){
    mostrar('carrito')
    for (var i = shopping_cart.length - 1; i >= 0; i--) {
        var table = document.getElementById("carrito_tabla");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = shopping_cart[i].art;
        cell1.innerHTML = "<p><b>Choco Break</b></p><img src='imagenes/img2.jpg' alt='Nature' class='responsive-image' width='30' height='20'>";
        cell2.innerHTML = '$ 200';
        cell3.appendChild(document.getElementById('div_art_'+shopping_cart[i].art));
        cell4.innerHTML = shopping_cart[i].cant;
        cell5.innerHTML = shopping_cart[i].cant;
    }

    //ajuste de la alineación vertical
    var c = document.getElementById("carrito_tabla");
    for (var i = 0; i < c.rows.length; i++) {
        for (var j = 0; j < c.rows[i].cells.length; j++) {
            console.log(c.rows[i].cells[j].style.verticalAlign = "middle")
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