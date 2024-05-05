// web_dynamic/static/scripts/4-hbnb.js

$(document).ready(function() {
    const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';
    const placesApiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';

    // Requête AJAX pour vérifier le statut de l'API
    $.get(apiUrl, function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    // Gestion des checkboxes pour les commodités
    let amenities = {};
    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenities[$(this).data('id')];
        }
    });

    $('button').click(function() {
        $.ajax({
            url: placesApiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
            success: function(places) {
                let html = '';
                places.forEach(function(place) {
                    html += `<article>
                                <div class="title_box">
                                    <h2>${place.name}</h2>
                                    <div class="price_by_night">$${place.price_by_night}</div>
                                </div>
                                <div class="information">
                                    <div class="max_guest">${place.max_guest} Guests</div>
                                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                </div>
                                <div class="description">${place.description}</div>
                             </article>`;
                });
                $('.places').html(html);
            }
        });
    });
});
