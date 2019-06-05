
$('#venImage').on('change', function () {
    let image = $("#venImage")[0].files[0];
    let formdata = new FormData();
    formdata.append('venImage', image);
    $.ajax({
        url: '/vendor/upload',
        type: 'POST',
        data: formdata,
        contentType: false,
        processData: false,
        'success': (data) => {
            $('#venImage').attr('src', data.file);
            $('#imageLocation').attr('value', data.file);// sets posterURL hidden field
            if (data.err) {
                $('#posterErr').show();
                $('#posterErr').text(data.err.message);
            } else {
                $('#posterErr').hide();
            }
        }
    });
});