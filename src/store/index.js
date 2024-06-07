// import { configureStore } from "@reduxjs/toolkit";
// import { logSl } from "./Auth";

// const store = configureStore({
//     reducer:{log:logSl.reducer}
// })

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./Auth";

const store = configureStore({
  reducer: {
    log: logReducer,
    // other reducers can go here
  },
});

export default store;
