console.log("HOLA");

var esta_vacio = function vacio(variablee){
    var es_vacio = "";
    if ((variablee == "undefined") || (variablee == "")){
        es_vacio = true;
    }
    else{
        es_vacio = false;
    }
    return es_vacio;
}

var texto_a_imprimir = "";

var requestURL = 'json/datos_mp.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var datos_mapa = request.response;

    //titulo principal
    mapaProcesos_titulo_ppal(datos_mapa);

    //procesos estrategicos
    mapaProcesos_titulos_procesos(datos_mapa);
    /*mapaProcesos_procesos_estrategicos(datos_mapa);*/
    
    //procesos operativos
    /*mapaProcesos_titulos_procesos(datos_mapa);
    mapaProcesos_procesos_operativos(datos_mapa);*/

    //procesos de apoyo
    /*mapaProcesos_titulos_procesos(datos_mapa);
    mapaProcesos_procesos_apoyo(datos_mapa);*/

    


    /*mapaProcesos_firstInfo(datos_mapa);*/
    /*mapaProcesos_secondInfo(datos_mapa);*/
}

function mapaProcesos_titulo_ppal(jsonObj) {
    var datos_mp_content = jsonObj['nombre'];
    var texto = "";
    texto = datos_mp_content;

    document.getElementById('titulo_ppal').innerHTML = texto;
}

function mapaProcesos_titulos_procesos(jsonObj) {
    var datos_mp_content = jsonObj['mp_estructura'];
    for (var i = 0; i < datos_mp_content.length; i++) {
        var result_nombre = "";
        var result_nivel = "";
        result_nombre = datos_mp_content[i].nombre;
        result_nivel = datos_mp_content[i].nivel;

/*        document.getElementById('bc_mp_procesos').innerHTML += 
            "<div class=\"bc_mp_subtitulo\">"+ result_nombre + "</div>"+
            "<div id=\"bc_mp_esquema_parte"+(i+1)+"\">";
*/
        texto_a_imprimir += 
            "<div class=\"bc_mp_subtitulo\">"+ result_nombre + "</div>"+
            "<div id=\"bc_mp_esquema_parte"+(i+1)+"\">";

        mapaProcesos_contenido_procesos(datos_mp_content[i],i);

        document.getElementById('bc_mp_procesos').innerHTML = texto_a_imprimir;

        //mapaProcesos_subprocesos(datos_mp_content[i],i);
    }
}

function mapaProcesos_contenido_procesos(jsonObj,cont) {
    var datos_mp_content = jsonObj.subnivel;
    for (var j = 0; j < datos_mp_content.length; j++) {
        
        var result_nombre = "";
        var result_nivel = "";
        result_nombre = datos_mp_content[j].nombre;
        result_nivel = datos_mp_content[j].nivel;
        result_nivel_sindecimal = result_nivel.split(".",2);
        /*result_nivel_sindecimal = result_nivel.substr(0,1);*/

        if (result_nivel_sindecimal[0] == "1"){
            /*document.getElementById('bc_mp_procesos').innerHTML += "<div class=\"bc_mp_caja_borde bc_mp_division_3\">"+ result_nombre + " " + result_nivel +"</div>";*/
            texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_division_3\">"+ result_nombre + " " + result_nivel +"</div>";
        }
        else
        {
            if (result_nivel_sindecimal[0] == "2"){
                /*document.getElementById('bc_mp_procesos').innerHTML += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_division_5\">"+ result_nombre + " " + result_nivel +"</div>";*/
                texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_division_5\">"+ result_nombre + " " + result_nivel +"</div>";
            }
            else
            {
                if (result_nivel_sindecimal[0] == "3"){
                    if (result_nivel_sindecimal[1] < "20"){
                        /*document.getElementById('bc_mp_procesos').innerHTML += "<div class=\"bc_mp_caja_borde bc_mp_division_6\">"+ result_nombre + " " + result_nivel +"</div>";*/
                        texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_division_6\">"+ result_nombre + " " + result_nivel +"</div>";
                    }
                    else
                        // (result_nivel_sindecimal[1] >= "20") - Las plataformas, tienen un color de fonde diferente. Su nivel es de 20 en adelante.
                    {
                        /*document.getElementById('bc_mp_procesos').innerHTML += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris1 bc_mp_division_6\">"+ result_nombre + " " + result_nivel +"</div>";*/
                        texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris1 bc_mp_division_6\">"+ result_nombre + " " + result_nivel +"</div>";
                    }
                }
            }
        }

        //mapaProcesos_subsubprocesos(datos_mp_content_subnivel[j],j);
            
    }
    /*document.getElementById('bc_mp_procesos').innerHTML += "</div>";*/
    texto_a_imprimir += "</div>";
}


function mapaProcesos_subsubprocesos(jsonObj,cont) {
    var datos_mp_content_subsubnivel = jsonObj.subnivel;
    for (var k = 0; k < datos_mp_content_subsubnivel.length; k++) {
        console.log("b" + k);
        var texto_resultado3 = "";
        texto_resultado3 = datos_mp_content_subsubnivel[k].nombre;

        document.getElementById('bc_mp_procesos').innerHTML += 
                "<div class=\"bc_mp_caja_borde bc_mp_division_3\">"+texto_resultado3+"</div>";
            
    }
    document.getElementById('bc_mp_procesos').innerHTML += "</div>";
}





/*var header = document.querySelector('header');
var section = document.querySelector('section');*/

/*var pruebas_json = document.getElementById('pruebasJson');    
var pruebas_iteracion_json = document.getElementById('pruebasIteracionJson');    
*/

/*
function mapaProcesos_primeraspruebas(jsonObj) {
    var myH1_obj = document.createElement('h1');
    var myH1_text = document.createElement('h1');
    myH1_obj.textContent = jsonObj['nombre'];
    myH1_text = jsonObj['nombre'];
    console.log(myH1_obj);
    console.log(myH1_text);
    pruebas_json.innerText = myH1_obj;
    pruebas_json.innerText = myH1_text;

    var myPara = document.createElement('p');
    myPara.textContent = 'Versión: ' + jsonObj['version'];
}
*/
/*function mapaProcesos_firstInfo(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['nombre'];
    pruebas_json.innerHTML = myH1;

    var myPara = document.createElement('p');
    myPara.textContent = 'Versión: ' + jsonObj['version'];
}
*/
/*
function mapaProcesos_secondInfo(jsonObj) {
    var datos_mp_content = jsonObj['mp_estructura'];

    for (var i = 0; i < datos_mp_content.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');
        
        var myList2 = document.createElement('ul');

        myPara1.textContent = datos_mp_content[i].nivel + " " + datos_mp_content[i].nombre;

        var datos_mp_content_subnivel = datos_mp_content[i].subnivel;
        for (var j = 0; j < datos_mp_content_subnivel.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = datos_mp_content_subnivel[j].nivel + " " + datos_mp_content_subnivel[j].nombre;
            myList.appendChild(listItem);
            
            var datos_mp_content_subnivel2 = datos_mp_content_subnivel[j].subnivel;
            if (!(esta_vacio(datos_mp_content_subnivel2))){
                for (var k = 0; k < datos_mp_content_subnivel2.length; k++) {
                    var listItem2 = document.createElement('li');
                    listItem2.textContent = datos_mp_content_subnivel2[k].nivel + " " + datos_mp_content_subnivel2[k].nombre + " " + datos_mp_content_subnivel2[k].codigoBC + " " + datos_mp_content_subnivel2[k].url + " " + datos_mp_content_subnivel2[k].tipoArchivo;
                    myList.appendChild(listItem2);
                }
            }
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myList);
        myArticle.appendChild(myList2);

        section.appendChild(myArticle);
    }
}

*/