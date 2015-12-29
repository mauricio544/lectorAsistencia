/*
 * Auto-generated content from the Brackets New Project extension.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler
$(document).ready(function () {
    "use strict";
    function getUrlParameter(name) {
        return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [,""])[1].replace(/\+/g, "%20")) || null;
    }
    var a = getUrlParameter("qrCode");

    $.ajax({
        url: "http://localhost:40617/TomaAsistencia/PJsonConfirmAsistencia/?asistencia=" + a,
        jsonp: "callback",
        method: "GET",
        dataType: "jsonp"
    }).done(function (response) {
        if(response.message === "Entrada"){
            $.ajax({
                url: "http://localhost:40617/TomaAsistencia/PJsonResult/?asistencia=" + a,
                jsonp: "callback",
                method: "GET",
                dataType: "jsonp"
            }).done(function (response) {
                $("#horaToma").text(response.message + " : " + response.asistencia);
                $("#alumno").text(response.alumno);
                $("#evento").text(response.evento);
                $("#expositor").text(response.expositor);
                $("#lugar").text(response.lugar);
                $("#fecha").text(response.fecha);
                $("#hora").text(response.hora);
                $("#fotoPersona").attr("src", "data:image/png;base64," + response.foto);   
            });
        }else if(response.message === "Salida"){
            if (window.confirm("Está seguro qué desea marcar la salida del evento?")) { 
              $.ajax({
                    url: "http://localhost:40617/TomaAsistencia/PJsonResult/?asistencia=" + a,
                    jsonp: "callback",
                    method: "GET",
                    dataType: "jsonp"
                }).done(function (response) {
                    $("#horaToma").text(response.message + " : " + response.asistencia);
                    $("#alumno").text(response.alumno);
                    $("#evento").text(response.evento);
                    $("#expositor").text(response.expositor);
                    $("#lugar").text(response.lugar);
                    $("#fecha").text(response.fecha);
                    $("#hora").text(response.hora);
                    $("#fotoPersona").attr("src", "data:image/png;base64," + response.foto);   
                });
            }else{
                document.location.href = "/";
            }
        }else if(response.message === "NoDate"){
            alert("imposible tomar asistencia, gracias!!");
            document.location.href = "/";
        }
        else{
            alert("La asistencia ya fue tomada, gracias!!");
            document.location.href = "/";
        }
        
    });

    
});