$(document).ready(function() {
    $.get("https://metu.life/motd.html", function(data) {
        $("#motd").html(data);
    });
}); 
