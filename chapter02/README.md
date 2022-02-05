- tsc가 유추 가능한 곳에 explicit하게 type을 추가하는 것을 피할 것.

ex)

```typescript
const age = 25; // age의 type은 tsc가 알아서 number로 추론
const getTax = (income: number): number => {
  return income * 0.15;
};

const tax = getTax(50000); // tax의 type은 tsc가 알아서 number로 추론
```

<br>

### typeof와 instanceof 타입가드

`typeof`는 타입스크립트 내장 타입에 사용되며, `instanceof`는 사용자가 만든 타입에 사용됨.

<br>

### never 타입

- never 타입은 논리적으로 끝까지 실행될 수 없는 함수의 반환 값
- 종단점이 없는 무한 loop을 도는 함수나 도달하지 못하는 지점에 return이 존재할 경우

```typescript
const padLeft = (value: string, padding: string | number): string => {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  } else if (typeof padding === "string") {
    return padding + value;
  } else {
    return padding; // else 블록은 파라미터의 type설정 + type가드에 의해 막혀 절대 도달할 수 없는 지점. 해당 padding의 type이 never이다
  }
};
```

<br>

### type, interface, class

- custom type을 `class`와 같이 선언하면 마치 값처럼 여러 번 사용할 수 있다.
- class 키워드를 사용하면 생성된 JS 코드에 해당 코드가 포함됨
- interface는 자바스크립트에는 해당하는 부분이 없음.

- runtime동안 객체를 instance화 한다면 `interface` 또는 `type`을 사용하고, 그 반대의 경우에는 `class`를 사용함. -> 값을 나타내는데 사용해야 하는 경우는 `class`를 사용함.
- tsc의 타입 검사기로 안전하게 custom type을 선언하고자 한다면 `type` 또는 `interface`를 사용함. -> JS 코드로 컴파일되지 않으므로 런타임 코드 용량이 더 작아진다.
- `type` 키워드는 `interface` 보다 많은 기능을 수행할 수 있다. (i.e. `interface`는 합집합, 교집합 개념이 없지만 `type`은 사용가능.)

<br>

### 명목적 (nomial) 타입 시스템과 구조적 (structural) 타입 시스템

- `Java`의 경우 Nomial type system

  - `Person` type의 변수에는 `Person` type 객체나 이를 상속받은 클래스의 객체만 넣을 수 있음.ㄹ

- `JavaScript`의 경우 structural type system 사용함.

```typescript
class Person {
  name: string;
}

class Customer {
  name: string;
}

const cust: Customer = new Person();
// type structure가 동일하므로 오류가 발생하지 않음.
```

- structure만 동일하면 할당할 수 있기 때문에 `new`를 이용하지 않고 객체 리터럴을 할당하더라도 문제가 없다.

```typescript
class Person {
  name: string;
}

const person1: Person = { name: "Leo" };
// type structure가 동일하므로 오류가 발생하지 않음.
```

- structural type system은 피할당자가의 필요조건만 충족시켜주면 ok. 대신 필요조건이 불충분할 경우 error를 뱉는다.
