$(document).ready(function () {
    "use strict";
    var pressed = false;
    var chars = [];
    $(window).keypress(function(e) {
        /*if (e.which >= 48 && e.which <= 57) {
            chars.push(String.fromCharCode(e.which));
        }  */      
        chars.push(String.fromCharCode(e.which));
        if (pressed) {
            setTimeout(function(){
                if (chars.length >= 10) {
                    var barcode = chars.join("");
                    console.log("Barcode Scanned: " + barcode);                    
                    $("#barcode").val(barcode);
                }
                chars = [];
                pressed = false;
            },500);
        }
        pressed = true;
    });
    $("#barcode").keypress(function(e){
      if ( e.which === 13 ) {
          console.log("Sin Submit Event");
          e.preventDefault();
      }
    });
    $("#barcode").change(function(){ 
        document.location.href = "tarjetaAsistencia.html?qrCode=" + $(this).val();         
    });
    $("#barcode").on("keyup paste mouseup input change", function(event){ 
        var _this = $(this);
        if(_this.val() !== "")
        {
            setTimeout(function(){
                document.location.href = "tarjetaAsistencia.html?qrCode=" + _this.val();         
            }, 1000)        
        }        
    });
});