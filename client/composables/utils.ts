// used to store loading state
export const useLoader = (state = false) => useState("isLoading", () => state);
