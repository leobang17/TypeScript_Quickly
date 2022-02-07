class Pair<K, V> {
  constructor(public key: K, public value: V) {}
}

function compare<K, V>(pair1: Pair<K, V>, pair2: Pair<K, V>): boolean {
  return pair1.key === pair2.key && pair1.value === pair2.value;
}

let p1: Pair<number, string> = new Pair(1, "Apple");
let p2 = new Pair(2, "String");

console.log(compare<number, string>(p1, p2));
