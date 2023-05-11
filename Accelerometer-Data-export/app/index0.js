/*
 * Entry point for the watch app
 */
import * as document from "document";
import * as fs from "fs";
import { display } from "display";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import * as messaging from "messaging";
const accelLabel = document.getElementById("accel-label");
const accelData = document.getElementById("accel-data");
const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");
const startButton = document.getElementById("button-1");
const stopButton = document.getElementById("button-2");
const sensors = [];

console.log("Max message size=" + messaging.peerSocket.MAX_MESSAGE_SIZE);
function sendToCompanion(dataaa) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message;
        const data = JSON.parse(dataaa)
        //console.log("Buffer=" + messaging.peerSocket.bufferedAmount);
        messaging.peerSocket.send(data);
    } else {
        // Catch error
        console.error("Unable to send data from app.");
    }
}

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
    console.log("socket opened App");  // Ready to send or receive messages
}
 function sensorRecording(){
  // Accelerometer data
  if (Accelerometer) {
    const accel = new Accelerometer({ frequency:5 });
    accel.addEventListener("reading", () => {
      const a="A"
      let date = new Date().toJSON();

      accelData.text = JSON.stringify({
        a,
        x: accel.x ? accel.x.toFixed(3) : 0,
        y: accel.y ? accel.y.toFixed(3) : 0,
        z: accel.z ? accel.z.toFixed(3) : 0
      });
      //datasssss.push(accelData.text);
    sendToCompanion(accelData.text)
    //secdata.push(accelData.text);

    });
    sensors.push(accel);
    accel.start();

  } else {
    accelLabel.style.display = "none";
    accelData.style.display = "none";
  }

  // Gyroscope data
  if (Gyroscope) {
    const gyro = new Gyroscope({ frequency: 5});
    gyro.addEventListener("reading", () => {
      const a="G"
      gyroData.text = JSON.stringify({
        a,
        x: gyro.x ? gyro.x.toFixed(3) : 0,
        y: gyro.y ? gyro.y.toFixed(3) : 0,
        z: gyro.z ? gyro.z.toFixed(3) : 0,
      });
      sendToCompanion(gyroData.text)
    });


    sensors.push(gyro);
    gyro.start();
  } else {
    gyroLabel.style.display = "none";
    gyroData.style.display = "none";
  }

}


  // new code
  // Message socket closes
  messaging.peerSocket.onclose = () => {
      console.warn("App Socket Closed");
  };


/*display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());

  //console.log("rrr",JSON.stringify(daa))
});
*/

startButton.addEventListener("click", (evt) => {
  console.log("CLICKED1");
  sensorRecording();

})


//sensors.map(sensor => sensor.start())
stopButton.addEventListener("click", (evt) => {
  console.log("CLICKED2");
  //console.log(JSON.stringify(sensors));
  sensors.map(sensor => sensor.stop());
  //sensors = [];
  //console.log("CLICKED2");
})
//fs.writeFileSync("json.txt", datasssss, "json");
