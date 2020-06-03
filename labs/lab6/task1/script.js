$(document).ready(function(){
    $.validator.setDefaults({
        highlight: function(element){
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function(element){
            $(element).closest('.form-control').removeClass('is-invalid');
        }
    })
    

    $('#form').submit(function(e){
        e.preventDefault();
    }).validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            name: {
                required: true
            },
            message: {
                required: true,
            }
        },
        messages: {
            email: {
                required: "Вкажіть e-mail!",
                email: "Вкажіть вірну електронну адресу"
            },
            name: {
                required: "Вкажіть ім'я!"
            },
            message: {
                required: "Надрукуйте повідомлення!"
            }
        },
        submitHandler: function(){
            const $form = $('#form');
    
            const $inputs = $("#form [data-name]");
            const dataToSend = {};
    
            $inputs.each((index, element) => {
                dataToSend[$(element).data("name")] = $(element).val();
            });
    
            const method = $form.attr('method');
            const url = $form.attr('action');
    
            $.ajax({
                type: method,
                url: url,
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                beforeSend: function() {
                    $('.loader').show();
                },
                complete: function(){
                    $('.loader').hide();
                },
                success: function() {
                    $('#state').text(`${method} запит на адресу ${url} надісланий успішно! :D`)
                },
                error: function() {
                    $('#state').text(`${method} запит на адресу ${url} не надіслано! :С`)
                },
            })
        }
    });
})