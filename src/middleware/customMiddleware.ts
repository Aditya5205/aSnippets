export const customMiddleware =
  (store: any) => (next: any) => (action: any) => {
    // performing the action before
    const result = next(action);

    // setting the local storage as the current stae of store
    localStorage.setItem("snippets", JSON.stringify(store.getState().snippets));

    return result;
  };
