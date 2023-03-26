export default class SensorRecord {
    constructor(accel) {
      this._accel = accel;    
      
    }
    get accel() {
        return this._accel;
  
    }
    set accel(a) {
        this._accel = a;
    }
}
