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
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  );
}
