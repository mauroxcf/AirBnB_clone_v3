const listAmenities = [];

$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    /* console.log(this.checked); */
    /* console.log($(this).attr('data-id')); */

    /* const amenityID = $(this).data('id'); */
    const amenityName = $(this).data('name');

    if (!this.checked) {
      // searchs the index in the list if not is in the list return -1
      const index = listAmenities.indexOf(amenityName);

      if (index !== -1) {
        // se coloca el indice y el numero de elementos a eliminar
        listAmenities.splice(index, 1);
      }

      showListAmenities();
      return;
    }

    listAmenities.push(amenityName);
    console.log(listAmenities);

    showListAmenities();
  });
});

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
