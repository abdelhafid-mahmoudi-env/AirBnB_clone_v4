dy(function () {

	let amenities = []
	let amenities_id = []
	let elements = $(".special")
	let cities_id = []
	let elem_cities = []
	let cities = $(".city")
	let states_id = []
	let elem_states = []
	let states = $(".state")
	for (elem of elements) {
		let name = $(elem).attr("data-name");
		let id = $(elem).attr("data-id");
		$(elem).change(function () {
			if (this.checked) {
				amenities_id.push(id)
				amenities.push(name);
				$(".amenities h4").text(amenities.join())
			}
			else {
				let index = amenities.indexOf(name);
				amenities.splice(index, 1);
				amenities_id.splice(index, 1);
				$(".amenities h4").text(amenities.join())
			}
		})
	}
	for (elem of cities) {
		let name = $(elem).attr("data-name");
		let a_id = $(elem).attr("data-id");
		$(elem).change(function () {
			if (this.checked) {
				cities_id.push(a_id)
				elem_cities.push(name)
				// amenities.push(name);
				$(".locations h4").text(elem_cities.join())
			}
			else {
				let index = elem_cities.indexOf(name);
				elem_cities.splice(index, 1);
				cities_id.splice(index, 1)
				$(".locations h4").text(elem_cities.join())
			}
		})
	}
	for (elem of states) {
		let name = $(elem).attr("data-name");
		let a_id = $(elem).attr("data-id");
		$(elem).change(function () {
			if (this.checked) {
				states_id.push(a_id)
				elem_states.push(name)
				// amenities.push(name);
				$(".locations h4").text(elem_states.join())
			}
			else {
				let index = elem_states.indexOf(name);
				elem_states.splice(index, 1);
				states_id.splice(index, 1)
				$(".locations h4").text(elem_states.join())
			}
		})
	}

	$.ajax({
		type: "GET",
		url: "http://0.0.0.0:5001/api/v1/status/",
		success: function (data) {
			if (data.status === "OK") {
				// alert(data.status)
				$("div#api_status").addClass("available")
			}
			else {
				//  alert(data.status);
				//   alert("Class should be removed");
				$("div#api_status").removeClass("available")
			}
		},
		error: function (err) {
			alert(err);
		}
	});

	$('button').click(() => {
		console.log("Send ids", amenities_id);
		$.ajax({
			type: "POST",
			url: "http://0.0.0.0:5001/api/v1/places_search/",
			data: JSON.stringify({ "amenities": amenities_id, "cities": cities_id, "states": states_id }),
			contentType: "application/json",
			success: (data) => {
				console.log(data)
				$(".places").html("");
				for (let d of data) {
					$(".places").append(
						"<article><div class='title_box'><h2>" +
						d.name + "</h2><div class='price_by_night'>" +
						d.price_by_night + "</div></div><div class='information'><div class='max_guest'>" +
						d.max_guest + "Guest" + (d.max_guest > 1 ? "s" : "") +
						"</div><div class='number_rooms'>" + d.number_rooms + "Bedroom" + (d.number_rooms != 1 ? "s" : "") +
						"</div><div class='number_bathrooms'>" + d.number_bathrooms + "Bathroom" +
						(d.number_bathrooms != 1 ? "s" : "") + "</div></div></article>")
				}
			},
			error: (err) => {
				console.log(err);
			}
		})
	})
})

