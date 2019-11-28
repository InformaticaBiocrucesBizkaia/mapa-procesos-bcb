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

var requestURL = 'json/datos_mp2_pruebas_v2.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
    var datos_mapa = request.response;

    //titulo principal
    mapaProcesos_titulo_ppal(datos_mapa);
    mapaProcesos_titulos_procesos(datos_mapa);
}

function imprimir_mapaProcesos() {
    document.getElementById('bc_mp_procesos').innerHTML = texto_a_imprimir;
    document.getElementById('bc_mp_procesos_subprocesos').innerHTML = txt_subprocesos;
}

//NIVEL: mp header
function mapaProcesos_titulo_ppal(jsonObj) { 
    var datos_mp_content = jsonObj['nombre'];
    var texto = "";
    texto = datos_mp_content;

    document.getElementById('titulo_ppal').innerHTML = texto;
}


//NIVEL: mp titulo
function mapaProcesos_titulos_procesos(jsonObj) {
    //Tenemos el JSON completo
    var datos_mp_fullcontent = jsonObj;

    //Tenemos el primer array del JSON completo [mp_estructura]
    var datos_mp_content = jsonObj.mp_estructura;
    /*var datos_mp_content = jsonObj['mp_estructura'];*/

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


        mapaProcesos_contenido_procesos_esquema(datos_mp_content,i);

        imprimir_mapaProcesos();
    }
}

//NIVEL: mp.i
function mapaProcesos_contenido_procesos_esquema(jsonObj,cont) {
    //Tenemos el JSON completo y el nivel en el que estamos
    var datos_mp_fullcontent = jsonObj;
    var i = cont;

    //Tenemos el segundo array del JSON completo [mp_estructura] -> [subnivel]
    var datos_mp_content = datos_mp_fullcontent[i].subnivel;

    for (var j = 0; j < datos_mp_content.length; j++) {
        var result_nombre = "";
        var result_nivel = "";
        result_nombre = datos_mp_content[j].nombre;
        result_nivel = datos_mp_content[j].nivel;
        result_nivel_sindecimal = result_nivel.split("_",3);
        
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

    }
    //Si hay subniveles, imprimirlos
    mapaProcesos_contenido_procesos_nivel_i(datos_mp_fullcontent,i);
    
    texto_a_imprimir += "</div>";
}


//NIVEL: mp.i.jj XXXX
function mapaProcesos_contenido_procesos_nivel_i(jsonObj,cont1) {
    //Tenemos el JSON completo y el nivel en el que estamos
    var datos_mp_fullcontent = jsonObj;
    var i = cont1;

    //Tenemos el tercer array del JSON completo [mp_estructura] -> [subnivel] -> [subnivel] 
    var datos_mp_content = datos_mp_fullcontent[i].subnivel;

    for (var j2 = 0; j2 < datos_mp_content.length; j2++) {
        var result_nombre_nivel1, result_nombre_nivel2, result_nombre, result_nivel = "";
        
        result_nombre_nivel1 = datos_mp_fullcontent[i].nombre;
        //result_nombre_nivel2 = datos_mp_fullcontent[i].subnivel[j].nombre;
 
        result_nombre = datos_mp_content[j2].nombre;      
        result_nivel = datos_mp_content[j2].nivel;
        
        /*console.log(result_nombre + result_nivel + result_codigo_BC + result_url + result_tipo_archivo);*/

        txt_subprocesos += 
            "<div class=\"contenedor contenedor_interno\" id=\"contenedor_internos_"+result_nivel+"\">"+
                "<div class=\"bc_mp_internos_esquema\">"+
                    "<div class=\"bc_mp_titulo\">"+
                        "<span class=\"class_esquema_titulo bc_mp_a\">"+ result_nombre_nivel1 +"</span> -> " + result_nombre +
                    "</div>";
            mapaProcesos_contenido_procesos_nivel_ii(jsonObj,i,j2);

        txt_subprocesos +=
                "</div>"+
            "</div>";

    }
        /*txt_subprocesos +=
                "</div>"+
            "</div>";*/
}

//NIVEL: mp.i.jj
function mapaProcesos_contenido_procesos_nivel_ii(jsonObj,cont1,cont2) {
    //Tenemos el JSON completo y el nivel en el que estamos
    var datos_mp_fullcontent = jsonObj;
    var i = cont1;
    var j = cont2;

    var primera_vez_col1 = false;
    var primera_vez_col2 = false;

    var datos_mp_content = datos_mp_fullcontent[i].subnivel[j].subnivel;
    console.log(datos_mp_content.length);

    for (var k = 0; k < datos_mp_content.length; k++) {
        var result_nombre_nivel1, result_nombre_nivel2, result_nombre, result_nivel, result_codigo_BC, result_url, result_tipo_archivo = "";
        
        result_nombre_nivel1 = datos_mp_fullcontent[i].nombre;
        result_nombre_nivel2 = datos_mp_fullcontent[i].subnivel[j].nombre;
 
        result_nombre = datos_mp_content[k].nombre;      
        result_nivel = datos_mp_content[k].nivel;
        result_codigo_BC = datos_mp_content[k].codigoBC;
        result_url = datos_mp_content[k].url;
        result_tipo_archivo = datos_mp_content[k].tipoArchivo;

        console.log(k+1);            
        console.log(datos_mp_content.length);            
        console.log(datos_mp_content.length/2);            
        if ((k) < (datos_mp_content.length/2)){
            console.log("primera parte");
            console.log(k +" - "+datos_mp_content.length/2);
            console.log(primera_vez_col1);
                txt_subprocesos += 
                        "<div class=\"contenedor contenedor_interno\" id=\"contenedor_internos_"+result_nivel+"\">"+
                            "<div class=\"bc_mp_internos_esquema\">"+
                                "<div class=\"bc_mp_titulo\">"+
                                    "<span class=\"class_esquema_titulo bc_mp_a\">"+ result_nombre_nivel1 +" -> " + result_nombre_nivel2 +" -> " + result_nombre +" "+ result_nivel+"</span>"+
                                "</div>";

                if (primera_vez_col1 == false){
                    primera_vez_col1 = true;
                    txt_subprocesos += 
                                "<div class=\"bc_mp_division_2\">&nbsp;";
                }
                    //mapaProcesos_contenido_procesos_nivel_iii(jsonObj,i,j,k);
                txt_subprocesos += 
                            "<div>aa</div>";

                txt_subprocesos += 
                                "</div>"+
                            "</div>"+
                        "</div>";
        }
        else{
            console.log("segunda parte");
            console.log(k +" - "+datos_mp_content.length/2);
            console.log(primera_vez_col2);
            if (primera_vez_col2 == false){
                primera_vez_col2 = true;
                txt_subprocesos += 
                    "<div class=\"bc_mp_division_2\">&nbsp;";
            }
                txt_subprocesos += 
                                    "<span class=\"class_esquema_titulo bc_mp_a\">"+ result_nombre_nivel1 +" -> " + result_nombre_nivel2 +" -> " + result_nombre +" "+ result_nivel+"</span>"+
                                "</div>";
                                //mapaProcesos_contenido_procesos_nivel_iii(jsonObj,i,j,k);
             
                txt_subprocesos += 
                            "</div>"+
                        "</div>"+
                    "</div>";
        }
    }
}


//NIVEL: mp.i.jj.kk
function mapaProcesos_contenido_procesos_nivel_iii(jsonObj,cont1,cont2,cont3) {
    //Tenemos el JSON completo y el nivel en el que estamos
    var datos_mp_fullcontent = jsonObj;
    var i = cont1;
    var j = cont2;
    var k = cont3;

    //Tenemos el cuarto array del JSON completo [mp_estructura] -> [subnivel] -> [subnivel] -> [subnivel] 
    console.log(datos_mp_fullcontent);
    var datos_mp_content = datos_mp_fullcontent[i].subnivel[j].subnivel[k].subnivel;
    console.log(datos_mp_content);

    for (var l = 0; l < datos_mp_content.length; l++) {
        console.log(l+1);

        var result_nombre, result_nivel, result_codigo_BC, result_url, result_tipo_archivo = "";
        
        result_nombre = datos_mp_content[l].nombre;      
        result_nivel = datos_mp_content[l].nivel;
        result_codigo_BC = datos_mp_content[l].codigoBC;
        result_url = datos_mp_content[l].url;
        result_tipo_archivo = datos_mp_content[l].tipoArchivo;

        txt_subprocesos += 
            "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_folder\">&nbsp;</div>"+
                "<div class=\"bc_mp_caja_content\">"+
                    "<span id=\"contenedor_internos_rrhh_nuevas_incorporaciones_box\" class=\"bc_mp_a\">"+ result_nombre +"</span>"+
                "</div>"+
            "</div>";
    }
}


