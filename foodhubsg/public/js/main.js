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

$(".select option").val(function (idx, val) {
    $(this).siblings('[value="' + val + '"]').remove();
});

