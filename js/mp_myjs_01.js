$(document).ready(function(){

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

    var requestURL = 'json/bc_mp_datos_v08.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var datos_mapa = request.response;

        // Titulo principal
        mapaProcesos_titulo_ppal(datos_mapa);
        
        // Mapa
        mapaProcesos_mapa(datos_mapa);

        //Los procesos
        mapaProcesos_procesos(datos_mapa);
        
        func_ver_mapa_principal();        
    }


    //NIVEL: mp titulo
    function mapaProcesos_titulo_ppal(jsonObj) { 
        var datos_mp_content = jsonObj['nombre'];
        
        document.getElementById('titulo_ppal').innerHTML = datos_mp_content;
    }

    //NIVEL: mp mapa
    function mapaProcesos_mapa(jsonObj) {
        //Tenemos el JSON completo
        var datos_mp_fullcontent = jsonObj;

        //Tenemos el primer array del JSON completo [mp_estructura]
        var datos_mp_content = jsonObj.subnivel;

        for (var i = 0; i < datos_mp_content.length; i++) {
            var mapa_div = $("<div>");
            mapa_div.addClass("bc_mp_subtitulo");
            $("#bc_mp_procesos").append(mapa_div);

            var mapa_div_div = $("<div>");
            mapa_div_div.addClass("bc_mp_a");
            mapa_div_div.attr("id","contenedor_ppal_titulo_"+datos_mp_content[i].nivel);
            mapa_div_div.attr("onclick","func_mapa_"+datos_mp_content[i].nivel+"()");
            mapa_div_div.text(datos_mp_content[i].nombre);
            mapa_div.append(mapa_div_div);

            var mapa_div2 = $("<div>");
            mapa_div2.attr("id","bc_mp_esquema_parte"+(i+1));
            mapa_div.append(mapa_div2);

            mapaProcesos_mapa_esquema(datos_mp_content,i,mapa_div2);
        }
    }

    //NIVEL: mp mapa esquema
    function mapaProcesos_mapa_esquema(jsonObj,cont,dentro_de) {
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
            result_nivel_sindecimal = result_nivel.split("_",9);
            
            //Recorrido del primer nivel del esquema del MP
            if (result_nivel_sindecimal[0] == "1"){
                if (result_nivel_sindecimal[1] == "01"){
                    var sub_mapa1_div1 = $("<div>");
                    sub_mapa1_div1.addClass("bc_mp_estruct_part1_25porc");
                    dentro_de.append(sub_mapa1_div1);
                    var sub_mapa1_div1_p1 = $("<p>");
                    sub_mapa1_div1.append(sub_mapa1_div1_p1);

                    var sub_mapa_div2 = $("<div>");
                    sub_mapa_div2.addClass("bc_mp_estruct_part1_50porc");
                    dentro_de.append(sub_mapa_div2);

                    var sub_mapa_div2_div = $("<div>");
                    sub_mapa_div2_div.addClass("bc_mp_caja_borde");
                    sub_mapa_div2_div.addClass("bc_mp_caja_bgcolor_azulbc_0");
                    sub_mapa_div2_div.addClass("bc_mp_estruct_part1_50porc_intern_33porc");
                    sub_mapa_div2_div.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa_div2_div.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa_div2_div.text(result_nombre);
                    sub_mapa_div2.append(sub_mapa_div2_div);

                    /*var sub_mapa_div2_div_div = $("<div>");
                    sub_mapa_div2_div_div.attr("id",datos_mp_content[j].nivel);
                    sub_mapa_div2_div_div.text(datos_mp_content[j].nombre);
                    sub_mapa_div2_div_div.append(sub_mapa_div2_div);*/
                    /*console.log(datos_mp_content[j].nivel);
                    console.log(datos_mp_content[j].nombre);*/
                }
                else
                {
                    if (result_nivel_sindecimal[1] == "02"){
                        var sub_mapa_div2_div = $("<div>");
                        sub_mapa_div2_div.addClass("bc_mp_caja_borde");
                        sub_mapa_div2_div.addClass("bc_mp_caja_bgcolor_azulbc_0");
                        sub_mapa_div2_div.addClass("bc_mp_estruct_part1_50porc_intern_33porc");
                        sub_mapa_div2_div.attr("id","mapa_"+datos_mp_content[j].nivel);
                        sub_mapa_div2_div.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                        sub_mapa_div2_div.text(result_nombre);
                        sub_mapa_div2.append(sub_mapa_div2_div);
                    }
                    else
                    {
                        if (result_nivel_sindecimal[1] == "03"){
                            var sub_mapa_div2_div = $("<div>");
                            sub_mapa_div2_div.addClass("bc_mp_caja_borde");
                            sub_mapa_div2_div.addClass("bc_mp_caja_bgcolor_azulbc_0");
                            sub_mapa_div2_div.addClass("bc_mp_estruct_part1_50porc_intern_33porc");
                            sub_mapa_div2_div.attr("id","mapa_"+datos_mp_content[j].nivel);
                            sub_mapa_div2_div.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                            sub_mapa_div2_div.text(result_nombre);
                            sub_mapa_div2.append(sub_mapa_div2_div);

                            var sub_mapa_div3 = $("<div>");
                            sub_mapa_div3.addClass("bc_mp_estruct_part1_25porc");
                            dentro_de.append(sub_mapa_div3);
                            var sub_mapa_div3_p1 = $("<p>");
                            sub_mapa_div3_p1.text("");
                            sub_mapa_div3.append(sub_mapa_div3_p1);

                        }
                    }
                }
            }

            //Recorrido del segundo nivel del esquema del MP
            if (result_nivel_sindecimal[0] == "2"){
                if (result_nivel_sindecimal[1] == "01"){
                    var sub_mapa2_div0 = $("<div>");
                    sub_mapa2_div0.addClass("bc_mp_estruct_part2_16porc");
                    dentro_de.append(sub_mapa2_div0);

                    var sub_mapa2_div1_div1 = $("<div>");
                    sub_mapa2_div1_div1.addClass("bc_mp_caja_borde");
                    sub_mapa2_div1_div1.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div1_div1.addClass("bc_mp_estruct_part2_16porc_agrupados_bottom");
                    sub_mapa2_div1_div1.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div1_div1.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div1_div1.text(result_nombre);
                    sub_mapa2_div0.append(sub_mapa2_div1_div1);
                }
                if (result_nivel_sindecimal[1] == "02"){
                    var sub_mapa2_div1_div2 = $("<div>");
                    sub_mapa2_div1_div2.addClass("bc_mp_caja_borde");
                    sub_mapa2_div1_div2.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div1_div2.addClass("bc_mp_estruct_part2_16porc_agrupados_top");
                    sub_mapa2_div1_div2.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div1_div2.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div1_div2.text(result_nombre);
                    sub_mapa2_div0.append(sub_mapa2_div1_div2);
                }
                if ((result_nivel_sindecimal[1]=="03")){
                    var sub_mapa2_div2_div1 = $("<div>");
                    sub_mapa2_div2_div1.addClass("bc_mp_estruct_part2_05porc");
                    sub_mapa2_div2_div1.text(">");
                    sub_mapa2_div2_div1.text(">");
                    dentro_de.append(sub_mapa2_div2_div1);
                    
                    var sub_mapa2_div2 = $("<div>");
                    sub_mapa2_div2.addClass("bc_mp_estruct_part2_16porc");
                    dentro_de.append(sub_mapa2_div2);

                    var sub_mapa2_div2_div2 = $("<div>");
                    sub_mapa2_div2_div2.addClass("bc_mp_caja_borde");
                    sub_mapa2_div2_div2.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div2_div2.addClass("bc_mp_estruct_part2_16porc_agrupados_bottom");
                    sub_mapa2_div2_div2.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div2_div2.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div2_div2.text(result_nombre);
                    sub_mapa2_div2.append(sub_mapa2_div2_div2);
                }
                if (result_nivel_sindecimal[1]=="04"){
                    var sub_mapa2_div2_div3 = $("<div>");
                    sub_mapa2_div2_div3.addClass("bc_mp_caja_borde");
                    sub_mapa2_div2_div3.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div2_div3.addClass("bc_mp_estruct_part2_16porc_agrupados_top");
                    sub_mapa2_div2_div3.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div2_div3.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div2_div3.text(result_nombre);
                    sub_mapa2_div2.append(sub_mapa2_div2_div3);
                }
                if (result_nivel_sindecimal[1]=="05"){
                    var sub_mapa2_div2_div2 = $("<div>");
                    sub_mapa2_div2_div2.addClass("bc_mp_caja_borde");
                    sub_mapa2_div2_div2.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div2_div2.addClass("bc_mp_estruct_part2_16porc_agrupados_top");
                    sub_mapa2_div2_div2.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div2_div2.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div2_div2.text(result_nombre);
                    sub_mapa2_div2.append(sub_mapa2_div2_div2);
                }
                if ((result_nivel_sindecimal[1] == "06")||(result_nivel_sindecimal[1]=="07")||(result_nivel_sindecimal[1] == "08")){
                    var sub_mapa2_div6 = $("<div>");
                    sub_mapa2_div6.addClass("bc_mp_estruct_part2_05porc");

                    sub_mapa2_div6.text(">");
                    dentro_de.append(sub_mapa2_div6);

                    var sub_mapa2_div7 = $("<div>");
                    sub_mapa2_div7.addClass("bc_mp_caja_borde");
                    sub_mapa2_div7.addClass("bc_mp_caja_bgcolor_verdebc");
                    sub_mapa2_div7.addClass("bc_mp_estruct_part2_16porc");
                    sub_mapa2_div7.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa2_div7.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa2_div7.text(result_nombre);
                    dentro_de.append(sub_mapa2_div7);
                }
            }

            //Recorrido del tercer nivel del esquema del MP
            if (result_nivel_sindecimal[0] == "3"){
                if (result_nivel_sindecimal[1] < "20"){
                    if (result_nivel_sindecimal[1] == "01"){
                        var sub_mapa3_div1 = $("<div>");
                        // sub_mapa3_div1.addClass("bc_mp_estruct_part3_50porc");
                        sub_mapa3_div1.addClass("bc_mp_estruct_part3_1_porparte");
                        dentro_de.append(sub_mapa3_div1);
                    }
                        
                    var sub_mapa3_div2 = $("<div>");
                    sub_mapa3_div2.addClass("bc_mp_caja_borde");
                    sub_mapa3_div2.addClass("bc_mp_caja_bgcolor_azulbc_1");
                    sub_mapa3_div2.addClass("bc_mp_estruct_part3_50porc_intern_33porc");
                    sub_mapa3_div2.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa3_div2.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa3_div2.text(result_nombre);
                    sub_mapa3_div1.append(sub_mapa3_div2);
                }
            }

            if (result_nivel_sindecimal[0] == "3"){
                if (result_nivel_sindecimal[1] > "20"){
                    if (result_nivel_sindecimal[1] == "21"){
                        var sub_mapa3_div3 = $("<div>");
                        // sub_mapa3_div3.addClass("bc_mp_estruct_part3_50porc");   
                        sub_mapa3_div3.addClass("bc_mp_estruct_part3_2_porparte");
                        dentro_de.append(sub_mapa3_div3);
                    }

                    var sub_mapa3_div4 = $("<div>");
                    sub_mapa3_div4.addClass("bc_mp_caja_borde");
                    sub_mapa3_div4.addClass("bc_mp_caja_bgcolor_azulbc_2");
                    sub_mapa3_div4.addClass("bc_mp_estruct_part3_50porc_intern_33porc");
                    sub_mapa3_div4.attr("id","mapa_"+datos_mp_content[j].nivel);
                    sub_mapa3_div4.attr("onclick","func_mapa_"+datos_mp_content[j].nivel+"()");
                    sub_mapa3_div4.text(result_nombre);
                    sub_mapa3_div3.append(sub_mapa3_div4);
                }
            }
        }
    }








    //NIVEL: mp titulo
    function mapaProcesos_procesos(jsonObj) {
        //Tenemos el primer array del JSON completo [mp_estructura]
        var datos_mp_content = jsonObj.subnivel;

        var datos_mp_procesos = $("<div>");
        datos_mp_procesos.attr("id","contenedor_subprocesos");
        $("#bc_mp_procesos_subprocesos").append(datos_mp_procesos);

        for (var i = 0; i < datos_mp_content.length; i++) {
            mapaProcesos_contenido_procesos_niveles(datos_mp_content,i,datos_mp_procesos,datos_mp_content[i].nivel,datos_mp_content[i].nombre,datos_mp_content[i].codigoBC);
        }
    }






    //NIVEL: mp.i.jj XXXX
    function mapaProcesos_contenido_procesos_niveles(jsonObj,cont1,dentro_de,padre_nivel,padre_nombre,padre_codigo){
        var datos_mp_fullcontent = jsonObj;
        var i = cont1;
        var datos_mp_fullcontent_sub = datos_mp_fullcontent[i].subnivel;
        var result_procesos_nombre = "";
        var result_procesos_nivel = "";
        result_procesos_nombre = datos_mp_fullcontent[i].nombre;
        result_procesos_nivel = datos_mp_fullcontent[i].nivel;
        result_procesos_nivel_sindecimal = result_procesos_nivel.split("_",9);
        /*console.log(datos_mp_fullcontent[i].nombre);
        console.log(datos_mp_fullcontent[i].nivel);*/

        if (datos_mp_fullcontent_sub){
            if (!((datos_mp_fullcontent_sub == "")||(datos_mp_fullcontent_sub == []))){

                var txt_procesos = $("<div>");
                txt_procesos.addClass("contenedor");
                txt_procesos.addClass("contenedor_interno");
                txt_procesos.attr("id","contenedor_internos_"+datos_mp_fullcontent[i].nivel);
                dentro_de.append(txt_procesos);

                var txt_procesos1 = $("<div>");
                txt_procesos1.addClass("bc_mp_internos_esquema");
                txt_procesos.append(txt_procesos1);        

                var txt_procesos11 = $("<div>");
                txt_procesos11.addClass("bc_mp_titulo");
                txt_procesos1.append(txt_procesos11);

                if (!((datos_mp_fullcontent[i].nivel == "1")||(datos_mp_fullcontent[i].nivel == "2")||(datos_mp_fullcontent[i].nivel == "3"))){
                    var txt_procesos111 = $("<span>");
                    txt_procesos111.addClass("class_esquema_titulo");
                    txt_procesos111.addClass("bc_mp_a");
                    /*txt_procesos111.attr("id","bc_contenedor_internos_titulo_"+datos_mp_fullcontent[i].nivel+"_padre");
                    txt_procesos111.attr("onclick","func_contenedor_internos_"+datos_mp_fullcontent[i].nivel+"_folder()");
                    txt_procesos111.text(datos_mp_fullcontent[i].nombre);*/
                    txt_procesos111.attr("id","bc_contenedor_internos_titulo_"+padre_nivel+"_padre");
                    txt_procesos111.attr("onclick","func_contenedor_internos_"+padre_nivel+"_folder()");
                    txt_procesos111.text(padre_nombre);
                    /*txt_procesos111.text(padre_nombre + " ("+ padre_codigo +")");*/
                    txt_procesos11.append(txt_procesos111);

                    var txt_procesos112 = $("<span>");
                    txt_procesos112.addClass("class_esquema_titulo");
                    txt_procesos112.addClass("bc_mp_no_a");
                    txt_procesos112.text("  >  ");
                    txt_procesos11.append(txt_procesos112);
                }
            
                var txt_procesos113 = $("<span>");
                txt_procesos113.addClass("class_esquema_titulo");
                txt_procesos113.addClass("bc_mp_no_a");
                txt_procesos113.attr("id","bc_contenedor_internos_titulo_"+datos_mp_fullcontent[i].nivel);
                /*txt_procesos113.attr("onclick","func_contenedor_internos_titulo_"+datos_mp_fullcontent[i].nivel+"()");*/
                if (datos_mp_fullcontent[i].codigoBC != ""){
                    // txt_procesos113.text(datos_mp_fullcontent[i].nombre + " ("+ datos_mp_fullcontent[i].codigoBC +")");
                    txt_procesos113.text(datos_mp_fullcontent[i].nombre);
                }
                else{
                    txt_procesos113.text(datos_mp_fullcontent[i].nombre);
                }
                txt_procesos11.append(txt_procesos113);

                var txt_procesos12 = $("<div>");
                txt_procesos12.addClass("bc_mp_divisiones");
                txt_procesos1.append(txt_procesos12);

                var primera_vez_col1 = false;
                var primera_vez_col2 = false;

                for (var j = 0; j < datos_mp_fullcontent_sub.length; j++) {
                    if (j < (datos_mp_fullcontent_sub.length/2)){
                        if (primera_vez_col1 == false){
                            primera_vez_col1 = true;
                            var txt_procesos121 = $("<div>");
                            txt_procesos121.addClass("bc_mp_division_2");
                            txt_procesos12.append(txt_procesos121);
                        }
                        mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j],txt_procesos121);
                    }
                    else{
                        if (primera_vez_col2 == false){
                            primera_vez_col2 = true;
                            var txt_procesos122 = $("<div>");
                            txt_procesos122.addClass("bc_mp_division_2");
                            txt_procesos12.append(txt_procesos122);
                        }
                        mapaProcesos_contenido_procesos_niveles_elementoindividual(datos_mp_fullcontent_sub[j],txt_procesos122);
                    }
                    if (!(esta_vacio(datos_mp_fullcontent_sub[j]))){
                        mapaProcesos_contenido_procesos_niveles(datos_mp_fullcontent_sub,j,dentro_de,result_procesos_nivel,result_procesos_nombre);
                    }
                }
            }
        }
    }


    function mapaProcesos_contenido_procesos_niveles_elementoindividual(jsonObj,dentro_de){
        var datos_indiv = jsonObj;
        if ((datos_indiv) && (datos_indiv.tipo)){
            var txt_subprocesos_individual = $("<div>");
            txt_subprocesos_individual.addClass("bc_mp_caja");
            txt_subprocesos_individual.addClass("bc_mp_division_interna");
            dentro_de.append(txt_subprocesos_individual);

            var txt_subprocesos_individual1 = $("<div>");
            txt_subprocesos_individual1.addClass("bc_mp_caja_icono");
            txt_subprocesos_individual1.addClass("bc_mp_icon");
            txt_subprocesos_individual.append(txt_subprocesos_individual1);
            
            var txt_subprocesos_individual2 = $("<div>");
            txt_subprocesos_individual2.addClass("bc_mp_caja_content");
            txt_subprocesos_individual.append(txt_subprocesos_individual2);

            if (datos_indiv.tipo == "folder"){
                var txt_subprocesos_individual21 = "";
                txt_subprocesos_individual1.addClass("bc_mp_icon_folder");

                txt_subprocesos_individual21 = $("<div>");
                txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                txt_subprocesos_individual21.attr("onclick","func_contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo+"()");
                /*txt_subprocesos_individual21.attr("id","contenedor_internos_"+datos_indiv.nivel);
                txt_subprocesos_individual21.attr("onclick","func_contenedor_internos_"+datos_indiv.nivel+"()");*/

                // console.log(datos_indiv.codigoBC);
                if (datos_indiv.codigoBC == ""){
                    txt_subprocesos_individual21.text(datos_indiv.nombre);
                }
                else
                { 
                    txt_subprocesos_individual21.text(datos_indiv.nombre + " ["+ datos_indiv.codigoBC +"]"); //quitamos el código de las carpetas
                }
                //txt_subprocesos_individual21.text(datos_indiv.nombre);
                txt_subprocesos_individual2.append(txt_subprocesos_individual21);
            }
            else{
                if (datos_indiv.tipo == "file"){
                    if (datos_indiv.extension == "pdf"){
                        txt_subprocesos_individual1.addClass("bc_mp_icon_pdf");
                        
                        var txt_subprocesos_individual22 = "";
                        txt_subprocesos_individual22 = $("<a/>");
                        txt_subprocesos_individual22.addClass("bc_a");
                        txt_subprocesos_individual22.addClass("bc_negrita");
                        txt_subprocesos_individual22.addClass("bc_mp_a");
                        txt_subprocesos_individual22.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                        txt_subprocesos_individual22.attr("href",datos_indiv.url);
                        txt_subprocesos_individual22.attr("target","_blank");
                        txt_subprocesos_individual22.text(datos_indiv.nombre + " ["+ datos_indiv.codigoBC +"]"); //codigo añadido en el titulo del archivo
                        txt_subprocesos_individual2.append(txt_subprocesos_individual22);
                    }
                    else{
                        if (datos_indiv.extension == "xls"){
                            txt_subprocesos_individual1.addClass("bc_mp_icon_xls");
                        
                            var txt_subprocesos_individual23 = "";
                            txt_subprocesos_individual23 = $("<a/>");
                            txt_subprocesos_individual23.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                            txt_subprocesos_individual23.attr("href",datos_indiv.url);
                            txt_subprocesos_individual23.attr("target","_blank");
                            txt_subprocesos_individual23.addClass("bc_a");
                            txt_subprocesos_individual23.addClass("bc_negrita");
                            txt_subprocesos_individual23.addClass("bc_mp_a");
                            txt_subprocesos_individual23.text(datos_indiv.nombre + " ["+ datos_indiv.codigoBC +"]");
                            txt_subprocesos_individual2.append(txt_subprocesos_individual23);
                        }
                        else{
                            if (datos_indiv.extension == "doc"){
                                txt_subprocesos_individual1.addClass("bc_mp_icon_doc");
                        
                                var txt_subprocesos_individual24 = "";
                                txt_subprocesos_individual24 = $("<a/>");
                                txt_subprocesos_individual24.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                                txt_subprocesos_individual24.attr("href",datos_indiv.url);
                                txt_subprocesos_individual24.attr("target","_blank");
                                txt_subprocesos_individual24.addClass("bc_a");
                                txt_subprocesos_individual24.addClass("bc_negrita");
                                txt_subprocesos_individual24.addClass("bc_mp_a");
                                txt_subprocesos_individual24.text(datos_indiv.nombre + " ["+ datos_indiv.codigoBC +"]");
                                txt_subprocesos_individual2.append(txt_subprocesos_individual24);
                            }
                            else{
                                if (datos_indiv.extension == "jpg"){
                                    txt_subprocesos_individual1.addClass("bc_mp_icon_img");
                            
                                    var txt_subprocesos_individual25 = "";
                                    txt_subprocesos_individual25 = $("<a/>");
                                    txt_subprocesos_individual25.attr("id","contenedor_internos_"+datos_indiv.nivel+"_"+datos_indiv.tipo);
                                    txt_subprocesos_individual25.attr("href",datos_indiv.url);
                                    txt_subprocesos_individual25.attr("target","_blank");
                                    txt_subprocesos_individual25.addClass("bc_a");
                                    txt_subprocesos_individual25.addClass("bc_negrita");
                                    txt_subprocesos_individual25.addClass("bc_mp_a");
                                    txt_subprocesos_individual25.text(datos_indiv.nombre + " ["+ datos_indiv.codigoBC +"]");
                                    txt_subprocesos_individual2.append(txt_subprocesos_individual25);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});