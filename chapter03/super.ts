class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    private age: number
  ) {}

  sellStock(symbol: string, numberOfShares: number) {
    console.log(`Selling ${numberOfShares} of ${symbol}`);
  }
}

class Employee extends Person {
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    public department: string
  ) {
    super(firstName, lastName, age);
  }

  sellStock(symbol: string, numberOfShares: number): void {
    // subclass의 sellStock 메서드
    super.sellStock(symbol, numberOfShares); // super class의 sellStock 메서드
    this.reportToCompliance(symbol, numberOfShares);
  }

  private reportToCompliance(symbol: string, shares: number) {
    console.log(
      `${this.lastName} from ${this.department} sold ${shares} shares of ${symbol}`
    );
  }
}
