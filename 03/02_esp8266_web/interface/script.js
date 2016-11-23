$( document ).ready(function() {

  // Create new aREST device when button is clicked
    var device = new Device("192.168.0.103");

    // Set device pins
    device.pinMode(4, "OUTPUT");

    // Button
    $('#on').click(function() {
      device.digitalWrite(4, 1);
    });

    $('#off').click(function() {
      device.digitalWrite(4, 0);
    });

    // Analog write
    $('#slider').mouseup(function() {
      var val = $('#slider').val();
      device.analogWrite(4, val);
    });

    // Temperature display
    device.getVariable('temperature', function(data) {
      console.log(data.temperature);
      $('#temperature').html(data.temperature);
    });

    // Humidity display
    device.getVariable('humidity', function(data) {
      $('#humidity').html(data.humidity);
    });

});
