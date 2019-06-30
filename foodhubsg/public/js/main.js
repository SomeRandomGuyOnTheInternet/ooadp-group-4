$(".select option").val(function (idx, val) {
    $(this).siblings('[value="' + val + '"]').remove();
});

$(".name-input").focusout(function () {
    $(this).val(
        toTitleCase($(this).val())
    );
});

$('#venUpload').on('change', function () {
    let image = $("#venUpload")[0].files[0];
    let formdata = new FormData();
    formdata.append('venImage', image);
    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        'success': (data) => {
            $('#venImage').attr('src', data.file);
            $('#imageURL').attr('value', data.file);// sets posterURL hidden field
            if (data.err) {
                $('#posterErr').show();
                $('#posterErr').text(data.err.message);
            } else {
                $('#posterErr').hide();
            }
        }
    });
});

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

function createShopTemplate(shops) {
    $("#all-shops-container").empty();
    console.log(shops)
    if (shops.length > 0) {
        for (i = 0; i < shops.length; i++) {
            $('#all-shops-container').append(
                '<div class="col-md-6 recommended-shops"><div class="blog-entry"><div class="blog-img">' +
                '<a class="action" href="/user/shops/' + shops[i].id + '"><img src="' + shops[i].imageLocation + '" class="img-responsive" alt="Image of shop"></a>' +
                '</div><div class="desc all-shops">' +
                '<b class="vendors"><b>' + shops[i].name + '</b></b><br>' +
                '<span class="food_location"><b>' + shops[i].address + '</b></span><br>' +
                '<span class="food_rating">Rating:' + generateRatingIcons(shops[i]) + '</span>' +
                '</div></div></div>'
            );  
        }
    } else {
        $('#all-shops-container').append('<div class="col-md-12"><h3 id="current_location"><b class="center_subtitle">There are no shops that match that criteria</b></h4></div>');
    }

};

function generateRatingIcons(shop) {
    var ratingHTMLstring = "&nbsp;No rating available";

    if (shop.rating) {
        ratingHTMLstring = '<b class="recommended-' + shop.isRecommended + '">';
        for (j = 0; j < shop.rating; j++)  ratingHTMLstring += '&nbsp;<i class="fas fa-star"></i>';
        for (n = 0; n < (5 - shop.rating); n++)  ratingHTMLstring += '&nbsp;<i class="far fa-star"></i>';
        ratingHTMLstring += '</b>'
    }

    return ratingHTMLstring;
};