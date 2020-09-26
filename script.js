//Ejecutando funciones
document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//Declarando variables
bars_search =       document.getElementById("ctn-bars-search");
cover_ctn_search =  document.getElementById("cover-ctn-search");
inputSearch =       document.getElementById("inputSearch");
box_search =        document.getElementById("box-search");


//Funcion para mostrar el buscador
function mostrar_buscador(){
    bars_search.style.display = "block";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

}

//Funcion para ocultar el buscador
function ocultar_buscador(){
    cover_ctn_search.style.display = "none";
    bars_search.style.display = "none";
    inputSearch.value = "";

}