import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import adminSlice from './features/admin/AdminSlice'

const customMiddleware = getDefaultMiddleware({
    serializableCheck:false
})

const localStorageConfiguration = {
    key:'global-storage',
    storage:localStorage
}

const rootReducer = combineReducers({
    admin:adminSlice
})


const persistedReducer = persistReducer(localStorageConfiguration,rootReducer)

export const Store = configureStore({
    reducer:persistedReducer,
    middleware:customMiddleware
})

export const persistor = persistStore(Store)