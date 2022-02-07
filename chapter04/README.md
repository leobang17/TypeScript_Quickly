## Enum

```typescript
// enum으로 구현
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
function move(dircection: Direction) {}

// union으로 구현
function move(direction: "Up" | "Down" | "Left" | "Right") {}

// custom type으로 구현
type Direction = "Up" | "Down" | "Left" | "Right";
function move(direction: Direction) {}
```

- 웬만하면 가독성을 위해 enum을 사용하자

<br>
<br>

## Generic

- type을 parameter로 사용하는 방ㅇ법
- typescript generic을 사용하면 다양한 type을 지원하는 함수를 작성할 수 있음.
  -> Generic을 사용해 함수를 선언하면, 함수의 호출자가 나중에 구체적인 type을 지정할 수 있다.

### Generic

제네릭은 코드를 사용 (i.e. 함수 호출 or 클래스 인스턴스화)할 때 타입을 선언함으로써 여러 종류의 타입 값을 처리할 수 있게 해줌.

```typescript
// Array 타입을 정의
const someValues: number[];

// Generic Array<> 키워드로 <> 기호 안에 타입 파라미터를 작성한다.
const someValues: Array<number>;
```

- 배열 내의 요소가 모두 같은 타입이라면 `number[]` 이런 식으로 선언하는게 훨씬 편하다.
- 배열 내의 요소가 두 가지 이상의 타입일 경우 Generic을 이용할 수 있음.

```typescript
const values1: Array<number | string> = ["Marry", 123, 567];
```

<br>

### Generic 타입 생성

- 자신만의 Generic class, interface, 혹은 function을 만드는 것도 가능하다.
- `generic.ts` 파일 참고

### Generic 타입의 기본값

generic 타입을 사용하기 위해서는 상세타입을 제공해야한다.

```typescript
class A<T> {
  value: T;
}

class B extends A {
  // 컴파일 오류 발생! A의 상세 타입을 지정해주지 않았으므로
}
```

- any 타입을 추가해주면 오류가 해결된다.

```typescript
class B extends A<any> {
  // 편 - 안
}
```

혹은 Generic 타입 선언 시 기본 parameter 타입을 추가할 수도 있다.

```typescript
class A<T = any> {
  value: T;
}

class B extends A {
  // 문제 x
}
```

any 타입 대신 임시 타입을 지정할 수 있다.

```typescript
class A<T = {}> {
  value: T;
}

class B implements A {
  value: {};
}
```

<br>

### Generic 함수 생성

```typescript
function printMe<T>(content: T): T {
  console.log(content);
  return content;
}

const a = printMe("Hello"); // tsc가 a의 타입을 string으로 추론해줌

class Person {
  constructor(public name: string);
}

const b = printMe(new Person("leo")); // tsc가 b의 타입을 Person으로 추론함.

// 이렇게 명시적으로 해줄 수도 있음.
const a2 = printMe<string>("Hello");
const b2 = printMe<Person>(new Person("leo"));
```

- 이렇게 명시적으로 해주는게 필요 없어 보일수도 있음.

```typescript
interface User {
  // 커스텀 타입 선언
  name: string;
  role: UserRole;
}

enum UserRole { // enum 타입 선언
  Administrator = "admin",
  Manager = "manager",
}

function loadUser<T>(): T {
  // generic 함수 선언
  return JSON.parse('{ "name": "john", "role": "admin"}');
}

const user = loadUser<User>(); // 상세 타입 User로 제네릭 함수 호출

switch (user.role) {
  case UserRole.Administrator:
    console.log("show control panel");
    break;
  case UserRole.Manager:
    console.log("Hide control panel");
    break;
}
```
