interface MotorVehicle {
  // class에서 '구현'될 method signature를 '선언'함
  startEngine(): boolean;
  stopEngine(): boolean;
  brake(): boolean;
  accelerate(speed: number);
  honk(howLong: number): void;
}

class Car implements MotorVehicle {
  startEngine(): boolean {
    return true;
  }
  stopEngine(): boolean {
    return true;
  }
  brake(): boolean {
    return true;
  }
  accelerate(speed: number) {
    console.log("drive faster");
  }
  honk(howLong: number): void {
    console.log("BEEPBEEP");
  }
  // custom method
  boong(): void {
    console.log("붕붕");
  }
}

const car1: Car = new Car();
const car2: MotorVehicle = new Car();
// car2는 MotorVehicle에서 강제하는 method만 이용할 수 있다.
// car2.boong(); 은 실행 불가.

interface Flyable {
  fly(howHigh: number);
  land();
}

interface Swimmable {
  swim(howFar: number);
}

class SecretServiceCar extends Car implements Flyable, Swimmable {
  fly(howHigh: number) {
    return true;
  }
  land() {
    return true;
  }
  swim(howFar: number) {
    return true;
  }
}
