/*
 * Entry point for the companion app
 */
import * as messaging from "messaging";
import { me } from "companion";
import { settingsStorage } from "settings";
import { localStorage } from "local-storage";

console.log("Companion code started");

messaging.peerSocket.onopen = function () {
    // Ready to send or receive messages
    console.log("Companion socket opened");
    console.log("Is here data?");
}
 messaging.peerSocket.addEventListener("message", (evt) => {
  console.log("aa",JSON.stringify(evt.data));
    
});
var i = 1;
let sensorLog = []; // holds  most current sensor records
// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
    // convert received message to string
    var timeStamp = new Date();
    var time = timeStamp.toJSON();
    let record = JSON.parse(evt.data);
    //console.log(JSON.stringify(record));
    console.log(record);
    if (record != null) {
        sensorLog.push(record);
    }
  //console.log(JSON.stringify(datasssss));

  console.log("I have no idea")
  //console.log(JSON.stringify(datasssss))
}

