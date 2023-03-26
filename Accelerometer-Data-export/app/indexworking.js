/*
 * Entry point for the watch app
 */
import * as document from "document";
import { display } from "display";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import * as messaging from "messaging";
const accelLabel = document.getElementById("accel-label");
const accelData = document.getElementById("accel-data");
const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");
const sensors = [];



//const accel = new Accelerometer({ frequency: 1});

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
    console.log("socket opened App");  // Ready to send or receive messages
}

//setInterval(getSensorRecord, 1000);


/*function getSensorRecord() {
    let sensorRecord = new SensorRecord();
    sensorRecord.accel = accel.x +"," + accel.y +","+ accel.z;
    sendToCompanion(sensorRecord);  
}

*/



const datasssss = []
// Accelerometer data
if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 5 });
  accel.addEventListener("reading", () => {
    //console.log(`${Date.now()},${accel.x},${accel.y},${accel.z}`);
    //sendToCompanion(accel)
    accelData.text = JSON.stringify({
      x: accel.x ? accel.x.toFixed(3) : 0,
      y: accel.y ? accel.y.toFixed(3) : 0,
      z: accel.z ? accel.z.toFixed(3) : 0
    });
    datasssss.push(accelData.text);
  });
  sensors.push(accel);
  accel.start();
  
} else {
  accelLabel.style.display = "none";
  accelData.style.display = "none";
}

// Gyroscope data
if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 30 });
  gyro.addEventListener("reading", () => {
    gyroData.text = JSON.stringify({
      x: gyro.x ? gyro.x.toFixed(3) : 0,
      y: gyro.y ? gyro.y.toFixed(3) : 0,
      z: gyro.z ? gyro.z.toFixed(3) : 0,
    });
  });
  sensors.push(gyro);
  gyro.start();
} else {
  gyroLabel.style.display = "none";
  gyroData.style.display = "none";
}
// new code 
function sendToCompanion(datasssss) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message;
        const datasssss = JSON.stringify(datasssss);
        messaging.peerSocket.send(datasssss);
        console.log("Data sent");
        
    } else {
        // Catch error
        console.error("Unable to send data from app.");
    }
}


// Message socket closes
messaging.peerSocket.onclose = () => {
    console.warn("App Socket Closed");
};
display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
  //console.log(accelData.text);
  sendToCompanion("datasssss")
  console.log(JSON.stringify(datasssss))
});

