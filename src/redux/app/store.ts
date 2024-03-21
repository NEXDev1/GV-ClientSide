import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "../features/reducer/userAuthSlice";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { apiSlice } from "../features/api/apiSlice";
import SideBarReducer from "../features/reducer/sidebarSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedUserAuthReducer = persistReducer(
    persistConfig,
    userAuthReducer
);


export const store = configureStore({
    reducer: {
        // [apiSlice.reducerPath]: apiSlice.reducer,
        userAuth: persistedUserAuthReducer,
        SideBar: SideBarReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor: Persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;