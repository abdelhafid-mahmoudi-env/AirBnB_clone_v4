$(document).ready(function() {
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
