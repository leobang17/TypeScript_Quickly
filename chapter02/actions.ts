// User활동에 응답하는 다양한 action

export class SearchAction {
  actionType: "SEARCH";
  constructor(readonly payload: { searchQuery: string }) {}
}

export class SearchSuccessAction {
  actionType: "SEARCH_SUCCESS";
  constructor(public payload: { searchResults: string[] }) {}
}

export class SearchFailedAction {
  actionType: "SEARCH_FAILED";
}

export type SearchActions =
  | SearchAction
  | SearchSuccessAction
  | SearchFailedAction;
