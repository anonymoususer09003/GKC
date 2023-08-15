const initialState = {
  image: {},
  video: {},
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'IMAGE':
      return {
        ...state,
        image: action.payload,
      };
    case 'VIDEO':
      return {
        ...state,
        video: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default filesReducer;
