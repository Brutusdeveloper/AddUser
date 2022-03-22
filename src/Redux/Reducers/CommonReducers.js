import { RECORDS } from "../ActionTriggered"

const initialState = {
    Records: 0
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case RECORDS:
          console.log("hello vijayyyyyyyyyy")
        return { Records: action.payload };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  