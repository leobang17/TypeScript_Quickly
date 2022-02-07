class AppState {
  counter = 0;
  private static instanceRef: AppState; // 단일 instance에 대한 reference를 저장
  private constructor() {} // new를 이용해서 reference가 다른 instance를 여러개 생성할 수 없게 함
  static getInstance(): AppState {
    // instance 생성 전이면 생성해서 return, 이미 있으면 instance reference return.
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState();
    }

    return AppState.instanceRef;
  }
}

// constructor가 private이기 때문에 Error 발생
// const appState = new AppState();

const appState1 = AppState.getInstance();
const appState2 = AppState.getInstance();

appState1.counter++;
appState2.counter++;

console.log(appState1.counter);
console.log(appState2.counter);
