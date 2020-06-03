$(document).ready(function(){
    $.ajax({
        url: "http://dummy.restapiexample.com/api/v1/employees",
        beforeSend: function() {
            $('#loader').show();
        },
        complete: function() {
            $('#loader').hide();
        },
        success: function(response){
            response.data.forEach(element => {
                const $tr = $('<tr/>').appendTo('#table');
                $('<td/>', {text: element.id}).appendTo($tr);
                $('<td/>', {text: element.employee_name}).appendTo($tr);
                $('<td/>', {text: element.employee_age}).appendTo($tr);
                $('<td/>', {text: element.employee_salary}).appendTo($tr);
            });
        }
    })
})