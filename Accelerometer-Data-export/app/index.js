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
function sendToCompanion(dataaa) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message;
        //const datasssss = JSON.stringify(datasssss);
        const data = JSON.parse(dataaa)
              /*{
    title: 'My test data',
    isTest: true,
    records: [1, 2, 3, 4]
  }*/
        messaging.peerSocket.send(data);
        //console.log("HIIIIII",JSON.stringify(dataaa));
        
    } else {
        // Catch error
        console.error("Unable to send data from app.");
    }
}


const datasssss = []
// Accelerometer data
if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 1 });
  accel.addEventListener("reading", () => {
    const a="A"   
    let date = new Date().toJSON();
    
    accelData.text = JSON.stringify({
      a,
      x: accel.x ? accel.x.toFixed(3) : 0,
      y: accel.y ? accel.y.toFixed(3) : 0,
      z: accel.z ? accel.z.toFixed(3) : 0
    });
    datasssss.push(accelData.text);
  sendToCompanion(accelData.text)
    
  });
  sensors.push(accel);
  accel.start();
  
} else {
  accelLabel.style.display = "none";
  accelData.style.display = "none";
}

// Gyroscope data
if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 1});
  gyro.addEventListener("reading", () => {
    const a="G"
    gyroData.text = JSON.stringify({
      a,
      x: gyro.x ? gyro.x.toFixed(3) : 0,
      y: gyro.y ? gyro.y.toFixed(3) : 0,
      z: gyro.z ? gyro.z.toFixed(3) : 0,
    });
    datasssss.push(gyroData.text);
  });
  sensors.push(gyro);
  gyro.start();
} else {
  gyroLabel.style.display = "none";
  gyroData.style.display = "none";
}
// new code 



// Message socket closes
messaging.peerSocket.onclose = () => {
    console.warn("App Socket Closed");
};
display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
  
  //console.log("rrr",JSON.stringify(daa))
});

