export default (state, { action, payload }) => {
  switch (action) {
    case "UPDATE_RESTAURANTS":
      return {
        ...state,
        restaurants: payload,
      };

    default:
      return state;
  }
};
