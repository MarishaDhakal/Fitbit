/*
 * Entry point for the companion app
 */
import * as messaging from "messaging";
import { me } from "companion";
import { settingsStorage } from "settings";
import { localStorage } from "local-storage";

//const reading = document.getElementById("overall-data");

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
const enddata = []
// Listen for the onmessage event
messaging.peerSocket.onmessage = function (evt) {
  console.log(JSON.stringify(evt.data));
  const reading = JSON.stringify(evt.data)
  enddata.push(reading)
  console.log("abbb",reading);

  fetch('https://10.0.0.41:441/', {
        method:'post',
      headers: {
       'Content-Type': 'application/json'
      },
      body:JSON.stringify(evt.data)
    }).then(function(result) {
      console.log('abclollll');
    }).catch(function (err){
      console.log(err)
    })



}
  //console.log("lol",JSON.stringify(enddata));
let sensorLog = []; // holds  most current sensor records
