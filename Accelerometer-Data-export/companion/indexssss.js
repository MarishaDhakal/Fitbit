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