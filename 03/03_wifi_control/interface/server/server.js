  Meteor.startup(function() {

      // Add device
      aREST.addDevice('http', '192.168.0.102');

      // Regularly check temperature
      SyncedCron.add({
          name: 'Check temperature',
          schedule: function(parser) {
              return parser.text('every 1 minute');
          },
          job: function() {
              Meteor.call('getVariable', 1, 'temperature', function(err, data) {

                  // Check temperature value
                  if (data.temperature < 20) {

                      // Activate relay
                      Meteor.call('digitalWrite', 1, 7, 1);
                  }
              });
          }
      });

  });
