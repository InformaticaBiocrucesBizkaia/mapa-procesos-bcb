var server_path = "http://www.fmradiords.com/electricdos/server_files/";

//FUNCIONES VALIDACIONES
    function validarEmailRegExp(email) {
        if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(email)){  
            return true;
        }
    }

    function validarNombreRegExp(text){
        //Esta expresión controla el tamaño mínimo y maximo de la cadena, pero ya lo hacemos de otros modos, con alerts/notifics
        //if (!(/^(([a-zA-Z0-9ÀÁÂÃÉÊÍÓÔÕÚÜàáâãéêíóôõúüÑñÇç_ ºª@#&]{6,20})+$)/).test(text)){  
        if (text == null || text.length == 0 || (!/^([a-zA-Z0-9ÀÁÂÃÉÊÍÓÔÕÚÜàáâãéêíóôõúüÑñÇç_ ºª@#&]+$)/.test(text))) { 
            return true;
        }
    }

    function validarComentarioRegExp(text){
        if (text == null || text.length == 0 || (!/^([a-zA-Z0-9ÀÁÂÃÉÊÍÓÔÕÚÜàáâãéêíóôõúüÑñÇç_ ºª@#&.,¡!¿?()]+$)/.test(text))) { 
        //if (text == null || text.length == 0 || (!/^\S+$/.test(text))) { 
            return true;
        }
    }

    function validarTelefonoRegExp(text){
        if (text == null || text.length != 9 || (!/^([0-9]+$)/.test(text))) {
            return true;
        }   
    }
     
    function validarTextoTamanioMinimo(text){
        if (text.length < 6) {
            return true;                           
        }
    }

    function validarTextoTamanioMaximo(text){
        if (text.length > 20) {
            return true;                           
        }
    }

    function validarTextoTamanioMinimoEmisora(text){
        if (text.length < 3) {
            return true;                           
        }
    }

    function validarTextoTamanioMaximoEmisora(text){
        if (text.length > 30) {
            return true;                           
        }
    }

    function validarTextoTamanioMinimoComentario(text){
        if (text.length < 20) {
            return true;                           
        }
    }

    function validarTextoTamanioMaximoComentario(text){
        if (text.length > 160) {
            return true;                           
        }
    }

    /* FORMULARIO */
    document.getElementById("id_form").addEventListener("click",function() {
        var error = false;

        //Comprobacion nombre
            valor_nombre = document.getElementById("id_nombre").value;
            if (validarNombreRegExp(valor_nombre)){
                error = true;    
                //document.getElementById('id_nombre_aviso').classList.remove('hidden');
                document.getElementById('id_nombre').classList.add('error_input');
            }
            else{
                document.getElementById('id_nombre_aviso').classList.add('hidden');   
                document.getElementById('id_nombre').classList.remove('error_input');
            }

        //Comprobacion email
            valor_email = document.getElementById("id_email").value;
            if (validarEmailRegExp(valor_email)){
                error = true;    
                //document.getElementById('id_email_aviso').classList.remove('hidden');
                document.getElementById('id_email').classList.add('error_input');
            }
            else{
                document.getElementById('id_email_aviso').classList.add('hidden');
                document.getElementById('id_email').classList.remove('error_input');
            }

        //Comprobacion telefono
            valor_telef = document.getElementById("id_telef").value;
            if (validarTelefonoRegExp(valor_telef)){
                error = true;    
                //document.getElementById('id_telef_aviso').classList.remove('hidden');
                document.getElementById('id_telef').classList.add('error_input');
            }
            else{
                document.getElementById('id_telef_aviso').classList.add('hidden');
                document.getElementById('id_telef').classList.remove('error_input');
            }

        //Comprobacion asunto
            valor_asunto = document.getElementById("id_asunto").value;
            if (validarComentarioRegExp(valor_asunto)){
                error = true;    
                //document.getElementById('id_asunto_aviso').classList.remove('hidden');
                document.getElementById('id_asunto').classList.add('error_input');
            }
            else{
                document.getElementById('id_asunto_aviso').classList.add('hidden');   
                document.getElementById('id_asunto').classList.remove('error_input');
            }

        //Comprobacion texto
            valor_texto = document.getElementById("id_texto").value;
            if (validarComentarioRegExp(valor_texto)){
                error = true;
                //document.getElementById('id_texto_aviso').classList.remove('hidden');
                document.getElementById('id_texto').classList.add('error_input');
            }
            else{
                document.getElementById('id_texto_aviso').classList.add('hidden');
                document.getElementById('id_texto').classList.remove('error_input');   
            }

        //Run            
            if (error == true){
                //console.log("Error!!");
                document.getElementById('id_todo_ko_aviso').classList.remove('hidden');   
                document.getElementById('id_todo_ok_aviso').classList.add('hidden');   
            }
            else{
                //console.log("Todo sin errores");
                send_email();

                document.getElementById("id_nombre").value = "";
                document.getElementById("id_email").value = "";
                document.getElementById("id_telef").value = "";
                document.getElementById("id_asunto").value = "";
                document.getElementById("id_texto").value = "";
             
                document.getElementById('id_todo_ok_aviso').classList.remove('hidden');   
                document.getElementById('id_todo_ko_aviso').classList.add('hidden');   
                
            }
    });

//Mandar Email a traves de Mandrillapp
function send_email() {
    var email_fijo = 'electricdos@gmail.com';
    var email_emisor = document.getElementById("id_email").value;
    var nombre = document.getElementById("id_nombre").value;
    var asunto = document.getElementById("id_asunto").value;
    var texto = "Nombre: " + document.getElementById("id_nombre").value
                + "<br>Email: " + document.getElementById("id_email").value
                + "<br>Telefono: " + document.getElementById("id_telef").value
                + "<br>Texto: " +document.getElementById("id_texto").value ;
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': '4_B9oqNdNDyoYlI1jqZYKA',
        'message': {
          'from_email': email_emisor,
          'to': [
              {
                'email': email_fijo,
                'name': nombre,
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': asunto,
          'html': texto
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}

/*
console.log(navigator.userAgent);
console.log(navigator.platform);
console.log(navigator);
*/