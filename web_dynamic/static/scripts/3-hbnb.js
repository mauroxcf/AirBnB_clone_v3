const listAmenities = [];
const listIdAmenities = [];

$(document).ready(function () {
  getStatus();
  $('input[type="checkbox"]').change(checkboxChange);
});

/**
 * checkboxChange - adds or deletes the choises amenities in h4 of amenities
 */
function checkboxChange () {
  const amenityName = $(this).data('name');
  const amenityId = $(this).data('id');

  if (!this.checked) {
    // searchs the index in the list if not is in the list return -1
    const index = listAmenities.indexOf(amenityName);

    if (index !== -1) {
      /*
      * first arguments is the index to start to delete
      * and the second is how many elements going to delete
      */
      listAmenities.splice(index, 1);
      listIdAmenities.splice(index, 1);
    }

    showListAmenities();
    return;
  }

  listAmenities.push(amenityName);
  listIdAmenities.push(amenityId);

  showListAmenities();
}

/**
 * showListAmenities - to check if the list is empty
 * if is empty put &nbsp; in the HTML
 */
function showListAmenities () {
  if (listAmenities.length) {
    $('div .amenities H4').text(listAmenities.join(', '));
  } else {
    $('div .amenities H4').html('&nbsp;');
  }
}

/**
 * getStatus - remove or add the class available
 * access to the status code to do that.
 */
function getStatus () {
  $.get('http://localhost:5001/api/v1/status/',
    function (data, status) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
        getPlaces();
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  );
}

/**
 * getPlaces - gets all places from the API
 */
function getPlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    data: '{}',
    ContentType: 'application/json',
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    success: function (response) {
      showPlaces(response);
    }
  });
}

/**
 * showPlaces - creates and show all places in the html
 * with the API request information
 *
 * @param {Array} listPlaces
 */
function showPlaces (listPlaces) {
  listPlaces.forEach(place => {
    // creating principal elements
    const article = $('<article></article>');
    const divTitle = $('<div class="title_box"></div>');
    const divInfo = $('<div class="information"></div>');
    const divDesc = $('<div class="description"></div>');

    // method html because the place.description is in html format
    divDesc.html(place.description);

    // creating elements of the divTitle
    /**
     * <h2>#Beautiful Studio in Waikiki</h2>
     * <div class="price_by_night">$119</div>
    */
    const title = '<h2>' + place.name + '</h2>';
    let divPrice = '<div class="price_by_night">$';
    divPrice += place.price_by_night + '</div>';

    // creating elements of the divTitle
    /**
     * <div class="max_guest">2 Guests</div>
     * <div class="number_rooms">0 Bedrooms</div>
     * <div class="number_bathrooms">1 Bathroom</div>
    */
    let divGuest = '<div class="max_guest">' + place.max_guest;
    divGuest += ' Guests</div>';
    let divRooms = '<div class="number_rooms">' + place.number_rooms;
    divRooms += ' Bedrooms</div>';
    let divBathrooms = '<div class="number_bathrooms">';
    divBathrooms += place.number_bathrooms + ' Bathroom</div>';

    // adding elements to the divs
    divTitle.append(title);
    divTitle.append(divPrice);

    divInfo.append(divGuest);
    divInfo.append(divRooms);
    divInfo.append(divBathrooms);

    // adding elements to article
    article.append(divTitle);
    article.append(divInfo);
    article.append(divDesc);

    // adding article to HTML
    $('SECTION.places').append(article);
  });
}
