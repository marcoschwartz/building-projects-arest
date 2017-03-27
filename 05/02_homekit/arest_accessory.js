var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;
var request = require('request');

var LightController = {
    name: "aREST Light", //name of accessory
    pincode: "031-45-155",
    username: "FA:3C:ED:5A:1A:1C", // MAC like address used by HomeKit to differentiate accessories. 
    manufacturer: "HAP-NodeJS", //manufacturer (optional)
    model: "v1.0", //model (optional)
    serialNumber: "A12S345KGE", //serial number (optional)

    power: false, //curent power status
    brightness: 100, //current brightness
    hue: 0, //current hue
    saturation: 0, //current saturation

    outputLogs: false, //output logs

    setPower: function(status) { //set power of accessory
        if (this.outputLogs) console.log("Turning the '%s' %s", this.name, status ? "on" : "off");
        this.power = status;
    },

    getPower: function() { //get power of accessory
        if (this.outputLogs) console.log("'%s' is %s.", this.name, this.power ? "on" : "off");
        return this.power ? true : false;
    },

    identify: function() { //identify the accessory
        if (this.outputLogs) console.log("Identify the '%s'", this.name);
    }
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "light".
var lightUUID = uuid.generate('hap-nodejs:accessories:light' + LightController.name);

// This is the Accessory that we'll return to HAP-NodeJS that represents our light.
var lightAccessory = exports.accessory = new Accessory(LightController.name, lightUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
lightAccessory.username = LightController.username;
lightAccessory.pincode = LightController.pincode;

// set some basic properties (these values are arbitrary and setting them is optional)
lightAccessory
    .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, LightController.manufacturer)
    .setCharacteristic(Characteristic.Model, LightController.model)
    .setCharacteristic(Characteristic.SerialNumber, LightController.serialNumber);

// listen for the "identify" event for this Accessory
lightAccessory.on('identify', function(paired, callback) {
    LightController.identify();
    callback();
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
lightAccessory
    .addService(Service.Lightbulb, LightController.name) // services exposed to the user should have "names" like "Light" for this case
    .getCharacteristic(Characteristic.On)
    .on('set', function(value, callback) {
        LightController.setPower(value);

        console.log(value);

        request('https://cloud.arest.io/87tf55/digital/5/' + value, function(error, response, body) {
            callback();
        });

    })
    // We want to intercept requests for our current power state so we can query the hardware itself instead of
    // allowing HAP-NodeJS to return the cached Characteristic.value.
    .on('get', function(callback) {
        callback(null, LightController.getPower());
    });
