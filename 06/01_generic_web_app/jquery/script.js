$(document).ready(function() {

    // Set pin to output
    $.ajax({

        url: 'https://cloud.arest.io/7cg83u/mode/5/o',

        crossDomain: true

    }).done(function(data) {

        console.log(data); // JSON data

        $.ajax({

            url: 'https://cloud.arest.io/7cg83u/digital/5/1',

            crossDomain: true

        }).done(function(data) {

            console.log(data); // JSON data

        });

    });

});
