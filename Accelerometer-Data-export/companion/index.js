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
var a=0;

// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
  console.log("abc");
  console.log(JSON.stringify(evt.data));
}
let sensorLog = []; // holds  most current sensor records



