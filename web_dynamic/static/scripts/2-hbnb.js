// web_dynamic/static/scripts/2-hbnb.js

$(document).ready(function() {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';

    // Requête AJAX pour vérifier le statut de l'API
    $.get(apiUrl, function(data) {
        if (data.status === 'OK') {
            // Ajout de la classe si l'API est disponible
            $('#api_status').addClass('available');
        } else {
            // Retrait de la classe si l'API n'est pas disponible
            $('#api_status').removeClass('available');
        }
    });

    // Code pour gérer les checkbox des commodités
    let amenities = {};
    
    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
        updateAmenitiesDisplay();
    });

    function updateAmenitiesDisplay() {
        $('.amenities h4').text(Object.values(amenities).join(', '));
    }
});

