// 식별 가능한 유니온 (Discriminated Unions)
interface Rectangle {
  kind: "rectangle"; // 식별자
  width: number;
  height: number;
}

interface Circle {
  kind: "circle"; // 식별자
  radius: number;
}

type Shape = Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "rectangle":
      return shape.height * shape.width;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

const myRectangle: Rectangle = { kind: "rectangle", width: 10, height: 30 };
console.log(`Rectangle's area is ${area(myRectangle)}`);

const isPerson = (object: any): object is Circle => "address" in object;
