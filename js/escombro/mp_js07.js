$(document).ready(function(){

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
    var txt_procesos = "";
    var txt_subprocesos = "";
    var txt_subprocesos_subprocesos = "";


    var requestURL = 'json/datos_mp2_pruebas_v3.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var datos_mapa = request.response;

        // Titulo principal
        //mapaProcesos_titulo_ppal(datos_mapa);
        
        // Mapa
        //mapaProcesos_mapa(datos_mapa);

        //Los procesos
        mapaProcesos_procesos(datos_mapa);
        
        //Los subprocesos
        //mapaProcesos_subprocesos(datos_mapa);
        
        imprimir_mapaProcesos();

        //ocultar("bc_mp_pruebas_ocultacion");
    }

    function imprimir_mapaProcesos() {
        document.getElementById('bc_mp_mapa').innerHTML = texto_a_imprimir;
        /*document.getElementById('bc_mp_procesos').innerHTML = txt_procesos;*/
        //document.getElementById('bc_mp_procesos_subprocesos_1').innerHTML = txt_subprocesos;
        /*document.getElementById('bc_mp_procesos_subprocesos_2').innerHTML = txt_subprocesos_subprocesos;*/
    }

    //NIVEL: mp titulo
    function mapaProcesos_titulo_ppal(jsonObj) { 
        var datos_mp_content = jsonObj['nombre'];
        var texto = "";
        texto = datos_mp_content;

        document.getElementById('titulo_ppal').innerHTML = texto;
    }

    //NIVEL: mp mapa
    function mapaProcesos_mapa(jsonObj) {
        //Tenemos el JSON completo
        var datos_mp_fullcontent = jsonObj;

        //Tenemos el primer array del JSON completo [mp_estructura]
        var datos_mp_content = jsonObj.subnivel;
        /*var datos_mp_content = jsonObj['mp_estructura'];*/

        for (var i = 0; i < datos_mp_content.length; i++) {
            var result_nombre = "";
            var result_nivel = "";
            result_nombre = datos_mp_content[i].nombre;
            result_nivel = datos_mp_content[i].nivel;

            texto_a_imprimir += 
                "<div class=\"bc_mp_subtitulo\">"+ result_nombre + "</div>"+
                "<div id=\"bc_mp_esquema_parte"+(i+1)+"\">";

            txt_subprocesos += "";
            txt_subprocesos_subprocesos += "";

            mapaProcesos_mapa_esquema(datos_mp_content,i);
        }
    }

    //NIVEL: mp mapa esquema
    function mapaProcesos_mapa_esquema(jsonObj,cont) {
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
        texto_a_imprimir += "</div>";
    }


    //NIVEL: mp titulo
    function mapaProcesos_procesos(jsonObj) {

        //Tenemos el primer array del JSON completo [mp_estructura]
        var datos_mp_content = jsonObj.subnivel;

        for (var i = 0; i < datos_mp_content.length; i++) {
            var result_nombre = "";
            var result_nivel = "";
            result_nombre = datos_mp_content[i].nombre;
            result_nivel = datos_mp_content[i].nivel;

            //console.log(datos_mp_content[i].nombre);
            //console.log(datos_mp_content[i].nivel);

            txt_subprocesos += "";
            
            mapaProcesos_contenido_procesos_niveles_pruebasaa(datos_mp_content,i);
        }
    }


    //NIVEL: mp.i.jj XXXX
    function mapaProcesos_contenido_procesos_niveles_pruebas(jsonObj,cont1) {
        var datos_mp_fullcontent = jsonObj;
        var i = cont1;
        var datos_mp_fullcontent_sub = datos_mp_fullcontent[i].subnivel;

        if (datos_mp_fullcontent_sub){
            if (!((datos_mp_fullcontent_sub == "")||(datos_mp_fullcontent_sub == []))){
                
                txt_subprocesos += 
                        "<div class=\"contenedor contenedor_interno\" id=\"contenedor_internos_"+ datos_mp_fullcontent[i].nivel +"\">"+
                            "<div class=\"bc_mp_internos_esquema\">"+
                                "<div class=\"bc_mp_titulo\">"+
                                    "<span class=\"class_esquema_titulo bc_mp_a\">"+ datos_mp_fullcontent[i].nombre + 
                                "</div>";

                var primera_vez_col1 = false;
                var primera_vez_col2 = false;

                for (var j = 0; j < datos_mp_fullcontent_sub.length; j++) {
                    //console.log(datos_mp_fullcontent_sub[j].nombre);

                    if ((j) < (datos_mp_fullcontent_sub.length/2)){
                        //console.log("primera parte");
                        //console.log(j + " - " + datos_mp_fullcontent_sub.length/2);
                        //console.log(primera_vez_col1);

                        if (primera_vez_col1 == false){
                            primera_vez_col1 = true;
                            txt_subprocesos += 
                                "<div class=\"bc_mp_division_2\">&nbsp;";
                        }
                            mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j]);
                                        
                    }
                    else{
                        //console.log("segunda parte");
                        //console.log(j +" - "+datos_mp_fullcontent_sub.length/2);
                        //console.log(primera_vez_col2);
                        if (primera_vez_col2 == false){
                            primera_vez_col2 = true;
                            txt_subprocesos += 
                                "</div>"+
                                "<div class=\"bc_mp_division_2\">&nbsp;";

                        }
                            mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j]);
                    }

                    if (datos_mp_fullcontent_sub.length == j){
                        txt_subprocesos += 
                                "</div>";   
                    }
                }

                txt_subprocesos +=
                            "</div>"+
                        "</div>";
            }
        }
    }


/*
    function mapaProcesos_contenido_procesos_niveles_elementoindividual(jsonObj) {
        var datos_indiv = jsonObj;
        if ((datos_indiv) && (datos_indiv.tipo)){
            if (datos_indiv.tipo == "folder"){
                txt_subprocesos +=
                    "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                        "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_folder\">&nbsp;</div>"+
                        "<div class=\"bc_mp_caja_content\">"+
                            "<div id=\"contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo+"\">"+ datos_indiv.nombre +"</div>"+
                        "</div>"+
                    "</div>";
            }
            else{
                if (datos_indiv.tipo == "file"){
                    if (datos_indiv.extension == "pdf"){
                        txt_subprocesos +=
                            "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                                "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_pdf\">&nbsp;</div>"+
                                "<div class=\"bc_mp_caja_content\">"+
                                    "<a class=\"bc_a bc_negrita bc_mp_a\" href=\""+datos_indiv.url+"\" id=\"contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo+"\" target=\"_blank\">"+ datos_indiv.nombre +"</a>"+
                                "</div>"+
                            "</div>";
                    }
                    else{
                        if (datos_indiv.extension == "xls"){
                            txt_subprocesos +=
                                "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                                    "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_xls\">&nbsp;</div>"+
                                    "<div class=\"bc_mp_caja_content\">"+
                                        "<span id=\"contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo+"\">"+ datos_indiv.nombre +"</span>"+
                                    "</div>"+
                                "</div>";
                        }
                        else{
                            if (datos_indiv.extension == "doc"){
                                txt_subprocesos +=
                                    "<div class=\"bc_mp_caja bc_mp_division_interna\">"+
                                        "<div class=\"bc_mp_caja_icono bc_mp_icon bc_mp_icon_doc\">&nbsp;</div>"+
                                        "<div class=\"bc_mp_caja_content\">"+
                                            "<span id=\"contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo+"\">"+ datos_indiv.nombre +"</span>"+
                                        "</div>"+
                                    "</div>";   
                            }

                        }
                    }
                }
            }
        }
    }
*/


//NIVEL: mp.i.jj XXXX
    function mapaProcesos_contenido_procesos_niveles_pruebasaa(jsonObj,cont1) {
        var datos_mp_fullcontent = jsonObj;
        var i = cont1;
        var datos_mp_fullcontent_sub = datos_mp_fullcontent[i].subnivel;

        if (datos_mp_fullcontent_sub){
            if (!((datos_mp_fullcontent_sub == "")||(datos_mp_fullcontent_sub == []))){

                var txt_procesos = $("<div>");
                txt_procesos.addClass("contenedor");
                txt_procesos.addClass("contenedor_interno");
                txt_procesos.attr("id","contenedor_internos_"+datos_mp_fullcontent[i].nivel);

                var txt_procesos1 = $("<div>");
                txt_procesos1.addClass("bc_mp_internos_esquema");

                var txt_procesos11 = $("<div>");
                txt_procesos11.addClass("bc_mp_titulo");

                var txt_procesos111 = $("<span>");
                txt_procesos111.addClass("class_esquema_titulo");
                txt_procesos111.addClass("bc_mp_a");
                txt_procesos111.text(datos_mp_fullcontent[i].nombre);

                var primera_vez_col1 = false;
                var primera_vez_col2 = false;

                $("#bc_mp_procesos_subprocesos_1").append(txt_procesos);
                txt_procesos.append(txt_procesos1);        
                txt_procesos1.append(txt_procesos11);
                txt_procesos11.append(txt_procesos111);
                
                for (var j = 0; j < datos_mp_fullcontent_sub.length; j++) {
                    var txt_procesos12 = $("<div>");
                    if ((j) < (datos_mp_fullcontent_sub.length/2)){
                        if (primera_vez_col1 == false){
                            primera_vez_col1 = true;
                        }
                        txt_procesos12.addClass("bc_mp_division_2");
                        txt_procesos1.append(txt_procesos12);
                        console.log("a");
                            //mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j]);
                    }
                    else{
                        if (primera_vez_col2 == false){
                            primera_vez_col2 = true;
                        }
                        txt_procesos12.addClass("bc_mp_division_2");
                        txt_procesos11.append(txt_procesos12);
                        console.log("b");
                            //mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j]);
                    }
                }
            }
        }
    }

    function mapaProcesos_contenido_procesos_niveles_elementoindividual(jsonObj) {
        var datos_indiv = jsonObj;
        if ((datos_indiv) && (datos_indiv.tipo)){

            var txt_subprocesos_individual = $("<div>");
            txt_subprocesos_individual.addClass("bc_mp_caja");
            txt_subprocesos_individual.addClass("bc_mp_division_interna");

            var txt_subprocesos_individual1 = $("<div>");
            txt_subprocesos_individual1.addClass("bc_mp_caja_icono");
            txt_subprocesos_individual1.addClass("bc_mp_icon");
            txt_subprocesos_individual1.text("&nbsp;");
            
            var txt_subprocesos_individual2 = $("<div>");
            txt_subprocesos_individual2.addClass("bc_mp_caja_content");

            var txt_subprocesos_individual21 = $("<div>");
            txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
            txt_subprocesos_individual21.text(datos_indiv.nombre);

            if (datos_indiv.tipo == "folder"){
                txt_subprocesos_individual1.addClass("bc_mp_icon_folder");

                var txt_subprocesos_individual21 = $("<div>");
                txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                txt_subprocesos_individual21.text(datos_indiv.nombre);

            }
            else{
                if (datos_indiv.tipo == "file"){
                    if (datos_indiv.extension == "pdf"){
                        txt_subprocesos_individual1.addClass("bc_mp_icon_pdf");
                        
                        var txt_subprocesos_individual21 = $("<a>");
                        txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                        txt_subprocesos_individual21.attr("href",datos_indiv.url);
                        txt_subprocesos_individual21.attr("target","_blank");
                        txt_subprocesos_individual21.addClass("bc_a");
                        txt_subprocesos_individual21.addClass("bc_negrita");
                        txt_subprocesos_individual21.addClass("bc_mp_a");
                        txt_subprocesos_individual21.text(datos_indiv.nombre);
                    }
                    else{
                        if (datos_indiv.extension == "xls"){
                            txt_subprocesos_individual1.addClass("bc_mp_icon_xls");
                        
                            var txt_subprocesos_individual21 = $("<a>");
                            txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                            txt_subprocesos_individual21.attr("href",datos_indiv.url);
                            txt_subprocesos_individual21.attr("target","_blank");
                            txt_subprocesos_individual21.addClass("bc_a");
                            txt_subprocesos_individual21.addClass("bc_negrita");
                            txt_subprocesos_individual21.addClass("bc_mp_a");
                            txt_subprocesos_individual21.text(datos_indiv.nombre);
                        }
                        else{
                            if (datos_indiv.extension == "doc"){
                                txt_subprocesos_individual1.addClass("bc_mp_icon_doc");
                        
                                var txt_subprocesos_individual21 = $("<a>");
                                txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                                txt_subprocesos_individual21.attr("href",datos_indiv.url);
                                txt_subprocesos_individual21.attr("target","_blank");
                                txt_subprocesos_individual21.addClass("bc_a");
                                txt_subprocesos_individual21.addClass("bc_negrita");
                                txt_subprocesos_individual21.addClass("bc_mp_a");
                                txt_subprocesos_individual21.text(datos_indiv.nombre);
                            }
                        }
                    }
                }
            }
        }
    }

    /*

    //NIVEL: mp.i.jj XXXX
    function mapaProcesos_contenido_procesos_niveles(jsonObj,cont1) {
        var datos_mp_fullcontent = jsonObj;
        var i = cont1;

        if (datos_mp_fullcontent[i].subnivel){        
            if (!((datos_mp_fullcontent[i].subnivel == "")||(datos_mp_fullcontent[i].subnivel == []))){

                for (var j = 0; j < datos_mp_fullcontent[i].subnivel.length; j++) {
                    console.log(datos_mp_fullcontent[i].subnivel[j].nombre + " "+ datos_mp_fullcontent[i].subnivel[j].nivel);
                    
                    txt_subprocesos += 
                        "<div class=\"contenedor contenedor_interno\" id=\"contenedor_internos_"+datos_mp_fullcontent[i].subnivel[j].nivel+"\">"+
                            "<div class=\"bc_mp_internos_esquema\">"+
                                "<div class=\"bc_mp_titulo\">"+
                                    "<span class=\"class_esquema_titulo bc_mp_a\">"+ datos_mp_fullcontent[i].nombre +"</span> -> " + datos_mp_fullcontent[i].subnivel[j].nombre +
                                "</div>";
                        
                        //mapaProcesos_contenido_procesos_niveles_contenido(datos_mp_fullcontent[i].subnivel,i,j);

                    mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent[i].subnivel[j]);

                    txt_subprocesos +=
                            "</div>"+
                        "</div>";

                }
            }
        }
    }



    function mapaProcesos_contenido_procesos_niveles_elementoindividual_subnivel(jsonObj) {
        var datos_indiv_subnivel = jsonObj;
        for (var p = 0; p < datos_indiv_subnivel.length; p++) {
            mapaProcesos_contenido_procesos_niveles(datos_indiv_subnivel,p);
        }
    }

    */

    

    function ocultar(bc_mp_ide){
        $("#"+bc_mp_ide).addClass("bc_mp_oculto");
        console.log("aa");
    }

    function mostrar(bc_mp_ide){
        $("#"+bc_mp_ide).removeClass("bc_mp_oculto");
        console.log("bb");
    }

    $(".contenedor_interno").click(function() {
        //mostrar(bc_mp_pruebas_ocultacion)
        console.log("contenedor_interno");
    });





    var txt_subprocesos_pruebas = $("<div>");
    txt_subprocesos_pruebas.addClass("bc_mp_caja");
    txt_subprocesos_pruebas.addClass("bc_mp_division_interna");

    var txt_subprocesos_pruebas_dentro1 = $("<div>");
    txt_subprocesos_pruebas_dentro1.addClass("bc_mp_caja_icono");
    txt_subprocesos_pruebas_dentro1.addClass("bc_mp_icon");
    txt_subprocesos_pruebas_dentro1.addClass("bc_mp_icon_folder");

    var txt_subprocesos_pruebas_dentro2 = $("<div>");
    txt_subprocesos_pruebas_dentro2.addClass("bc_mp_caja_content");

    var txt_subprocesos_pruebas_dentro21 = $("<div>");
    txt_subprocesos_pruebas_dentro21.attr("id","contenedor_internos_99_01_folder");
    txt_subprocesos_pruebas_dentro21.text("aaa");

    

    txt_subprocesos_pruebas.append(txt_subprocesos_pruebas_dentro1);
    txt_subprocesos_pruebas.append(txt_subprocesos_pruebas_dentro2);
    txt_subprocesos_pruebas_dentro2.append(txt_subprocesos_pruebas_dentro21);
    $("body").append(txt_subprocesos_pruebas);



    $("#contenedor_internos_99_01_folder").click(function() {
        //mostrar(bc_mp_pruebas_ocultacion)
        console.log("dd");
    });




    



    
});
