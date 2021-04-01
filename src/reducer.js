export default (state, { action, payload }) => {
  switch (action) {
    case "UPDATE_RESTAURANTS":
      return {
        ...state,
        restaurants: payload,
      };
    case "FILTER_RESTAURANTS":
      return {
        ...state,
        filtered: payload.filtered,
        filter: payload.filter,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filtered: [],
        filter: 0,
      };

    default:
      return state;
  }
};
