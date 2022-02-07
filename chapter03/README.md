### 명시적 선언, 암시적 선언

```typescript
// explicit
class Person {
  public firstName;
  public lastName;
  private age;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

// implicit
class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    private age: number
  ) {}
}
```

- 둘 다 tsc를 이용해 JS로 transfile하면 동일한 코드.
- 명시적 선언은 가독성을 높이지만 암시적 선언은 코드를 간결하게 만듦
- 정답은 없지만, 대부분 단순 property initialize의 경우 암시적 선언을 사용한다.

<br>

### static과 singleton pattern

- class간의 property를 공유할 때 `static` -> class에서 접근할 수 있음 (instance에서는 nope)
- 단 하나의 instance를 생성하는 디자인 패턴을 `singleton`이라고 함.
  - 프로그램 전반에서 사용하는 instance를 1개만 구현하고 생성된 instance는 어디에서든지 참조할 수 있다.

<br>

### method overloading

- Java, C# 등의 OOP 언어들은 method overloading을 지원함.
- parameter의 유형과 개수가 다르지만 이름이 같은 method를 여러개 가질 수 있는 것을 의미함
- 오버로딩을 사용하면 여러 방법으로 method를 호출할 수 있지만, 전체적인 로직을 읽고 판단하기 힘들어질 수 있기 때문에 오버로딩 사용을 절제하는 것이 일반적이다.

**Method Overloading의 잘못된 예**

- 두 메서드에서 바로 구현을 해버림

```typescript
class ProductService {
  getProducts() {
    console.log(`Getting all products`);
  }

  getProducts(id: number) {
    console.log(`Getting the product info for ${id}`);
  }
}
```

**Method Overloading의 올바른 예**

- 허용가능한 method를 선언해놓은 후, 한번에 구현함.

```typescript
class ProductService {
  getProducts(); // 선언만
  getProducts(id: number); // 선언만
  getProducts(id?: number) {
    // 한번에 구현
    if (typeof id === "number") {
      console.log(`Getting the product info for ${id}`);
    } else {
      console.log(`Getting all products`);
    }
  }
}
```

<br>

### Interface Programming

- `class`를 `implements`해서 멤버들을 강제할 수도 있다.
- `implements` 당한 class는 슈퍼 클래스의 멤버 property들을 모두 가져야 하며, 멤버 method의 signature를 가진 메서드를 모두 생성해야한다.

<br>

### Mocking

- API를 자세히 구현하기 전에 간단하게 하드코딩된 값을 돌려주는 클래스를 만들어야 할 때.
- 구현해야하는 `interface`를 만들어놓고 실제 class와 Mocking하는 class 둘에 모두 implements 한다.

```typescript
interface Product {
  id: number;
  description: stringl;
}

interface IProductService {
  getProducts(): Product[];
  getProductById(id: number): Product;
}

class ProductService implements IProductService {
  getProducts(): Product[] {
    // logics
    return [];
  }

  getProductById(id: number): Product {
    // logic
    return;
  }
}

class MockProductService implements IProductService {
  //
}
```

- 여기서는 class 명을 **ProductService**로, interface 명을 **IProductService**를 사용했지만,일부 개발자들은 interface이름을 **ProductService**로 사용하고 class 명을 **ProductServiceImpl** 을 사용하는 것을 선호하기도 함.

<br>

### Factory Function

- interface programming의 좋은 예.
- 상황에 따라 객체의 instance를 반환하는 함수

- e.g. ProductService와 MockProductService 타입 중 하나를 반환하는 팩토리 함수

```typescript
function getProductService(isProduction: boolean): IProductService { // 타입을 반환하는 팩토리 함수
  if (isProduction) {
    return new ProductService();
  } else {
    return new MockProductService();
  }
}

let productService: IProductService;

// ...
const isProd = true;
productService = getProductService(idProd);

const products[] = productService.getProducts();
```
