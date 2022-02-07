interface Comparepare<T> {
  compareToValue(value: T): number;
}

class Rectangle implements Comparepare<Rectangle> {
  constructor(private width: number, private height: number) {}

  compareToValue(value: Rectangle): number {
    return this.height * this.width - value.width * value.height;
  }
}

class Triangle implements Comparepare<Triangle> {
  constructor(private height: number, private width: number) {}

  compareToValue(value: Triangle): number {
    return this.height * this.width * 0.5 - value.width * value.height * 0.5;
  }
}

class Programmer implements Comparepare<Programmer> {
  constructor(public name: string, private salary: number) {}
  compareToValue(value: Programmer): number {
    return this.salary - value.salary;
  }
}

const rect1 = new Rectangle(2, 5);
const rect2 = new Rectangle(3, 5);

console.log(rect2.compareToValue(rect1));

const prog1 = new Programmer("Leo", 1000);
const prog2 = new Programmer("yunniyuns", 2000);
prog1.compareToValue(prog2);

class A<T = {}> {
  value: T;
}

class B implements A {
  value: {};
}
