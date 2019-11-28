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
var txt_subprocesos = "";

var requestURL = 'json/datos_mp2.json';
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

function imprimir_mapaProcesos() {
    document.getElementById('bc_mp_procesos').innerHTML = texto_a_imprimir;
    document.getElementById('bc_mp_procesos_subprocesos').innerHTML = txt_subprocesos;
}


//NIVEL: i
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

        txt_subprocesos += "";


        mapaProcesos_contenido_procesos(datos_mp_content[i],i);
        imprimir_mapaProcesos();
    }
}

//NIVEL: i.jj
function mapaProcesos_contenido_procesos(jsonObj,cont) {
    var datos_mp_fullcontent = jsonObj;
    var datos_mp_content = jsonObj.subnivel;
    for (var j = 0; j < datos_mp_content.length; j++) {
        
        var result_nombre = "";
        var result_nivel = "";
        result_nombre = datos_mp_content[j].nombre;
        result_nivel = datos_mp_content[j].nivel;
        result_nivel_sindecimal = result_nivel.split(".",3);
        /*result_nivel_sindecimal = result_nivel.substr(0,1);*/
        
        //Recorrido del primer nivel del esquema del MP
        if (result_nivel_sindecimal[0] == "1"){
            if (result_nivel_sindecimal[1] == "01"){
                texto_a_imprimir += "<div class=\"bc_mp_estruct_part1_25porc\"><p></p></div>"+
                                    "<div class=\"bc_mp_estruct_part1_50porc\">"+ 
                                    "<div class=\"bc_mp_caja_borde bc_mp_estruct_part1_50porc_intern_33porc\">"+ result_nombre +"</div>";
            }
            else
            {
                if (result_nivel_sindecimal[1] == "02"){
                    texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_estruct_part1_50porc_intern_33porc\">"+ result_nombre +"</div>";
                }
                else
                {
                    if (result_nivel_sindecimal[1] == "03"){
                        texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_estruct_part1_50porc_intern_33porc\">"+ result_nombre +"</div>"+"</div>"+
                                            "<div class=\"bc_mp_estruct_part1_25porc\"><p></p></div>";
                    }
                }
            }
        }

        //Recorrido del segundo nivel del esquema del MP
        if (result_nivel_sindecimal[0] == "2"){
                if (result_nivel_sindecimal[1] == "01"){
                    texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_estruct_part2_16porc\">"+ result_nombre +"</div>";
                }
                else{
                    if ((result_nivel_sindecimal[1]=="02")||(result_nivel_sindecimal[1]=="05")){
                        texto_a_imprimir += "<div class=\"bc_mp_estruct_part2_05porc\">"+ ">" +"</div>"+
                                                "<div class=\"bc_mp_estruct_part2_16porc\">"+
                                                    "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_estruct_part2_16porc_agrupados_bottom\">"+ result_nombre +"</div>";
                    }
                    else
                    {
                        if ((result_nivel_sindecimal[1]=="03")||(result_nivel_sindecimal[1]=="06")){
                            texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_estruct_part2_16porc_agrupados_top\">"+ result_nombre +"</div>"+
                                                "</div>";
                        }
                    }
                    if ((result_nivel_sindecimal[1] == "04")||(result_nivel_sindecimal[1] == "07")){
                            texto_a_imprimir += "<div class=\"bc_mp_estruct_part2_05porc\">"+ ">" +"</div>"+
                                "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris2 bc_mp_estruct_part2_16porc\">"+ result_nombre +"</div>";
                    }
                }
        }

        //Recorrido del tercer nivel del esquema del MP
        if (result_nivel_sindecimal[0] == "3"){
            if (result_nivel_sindecimal[1] < "20"){
                if (result_nivel_sindecimal[1] == "01"){
                    texto_a_imprimir += "<div class=\"bc_mp_estruct_part3_50porc\">";
                }
                    

                texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_estruct_part3_50porc_intern_33porc\">"+ result_nombre +"</div>";
            }
            else
            {
                if (result_nivel_sindecimal[1] == "21"){
                    texto_a_imprimir += "</div><div class=\"bc_mp_estruct_part3_50porc\">";
                }

                texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris1 bc_mp_estruct_part3_50porc_intern_33porc\">"+ result_nombre +"</div>";

                if (result_nivel_sindecimal[1] == "29"){
                    texto_a_imprimir += "</div>";
                }
            }
        }

        /*mapaProcesos_subsubprocesos(datos_mp_content_subnivel[j],j);*/

        //Si hay subniveles, imprimirlos
        console.log("1");
        console.log(datos_mp_fullcontent);
        if (datos_mp_content[j].subnivel.length > 0){
            mapaProcesos_contenido_procesos_subprocesos(datos_mp_content[j],j);
        }
        
    }
    texto_a_imprimir += "</div>";
}


//NIVEL: i.jj.kk
function mapaProcesos_contenido_procesos_subprocesos(jsonObj,cont) {
    var datos_mp_content = jsonObj.subnivel;
    for (var k = 0; k < datos_mp_content.length; k++) {
        
        var result_nombre = "";
        var result_nivel = "";
        result_nombre = datos_mp_content[k].nombre;
        result_nivel = datos_mp_content[k].nivel;
        result_codigo_BC = datos_mp_content[k].codigoBC;
        result_url = datos_mp_content[k].url;
        result_tipo_rchivo = datos_mp_content[k].tipoArchivo;
        
        console.log(result_nombre + result_nivel + result_codigo_BC + result_url + result_tipo_rchivo);

        txt_subprocesos += 
            "<div class=\"contenedor contenedor_interno\" id=\"contenedor_internos_rrhh\">"+
                "<div class=\"bc_mp_internos_esquema\">"+
                    "<div class=\"bc_mp_titulo\">"+
                        "<span class=\"class_esquema_titulo bc_mp_a\">Procesos de apoyo</span> -> Gestión de Recursos Humanos"+
                    "</div>"+
                    "<div class=\"bc_mp_division_2\">"+
                        "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                            "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_folder\">"+
                                "&nbsp;"+
                            "</div>"+
                            "<div class=\"bc_mp_caja_content\">"+
                                "<span id=\"contenedor_internos_rrhh_nuevas_incorporaciones_box\" class=\"bc_mp_a\">"+ result_nombre +"</span>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>";


        /*if (result_nivel_sindecimal[0] == "3"){
            if (result_nivel_sindecimal[1] < "20"){
                if (result_nivel_sindecimal[1] == "01"){
                    texto_a_imprimir += "<div class=\"bc_mp_estruct_part3_50porc\">";
                }
                    

                texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_estruct_part3_50porc_intern_33porc\">"+ result_nombre +"</div>";
            }
            else
            {
                if (result_nivel_sindecimal[1] == "21"){
                    texto_a_imprimir += "</div><div class=\"bc_mp_estruct_part3_50porc\">";
                }

                texto_a_imprimir += "<div class=\"bc_mp_caja_borde bc_mp_caja_bgcolor_gris1 bc_mp_estruct_part3_50porc_intern_33porc\">"+ result_nombre +"</div>";

                if (result_nivel_sindecimal[1] == "29"){
                    texto_a_imprimir += "</div>";
                }
            }
        }*/
    }
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



