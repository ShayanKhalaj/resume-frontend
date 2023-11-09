import { combineReducers, configureStore,getDefaultMiddleware } from "@reduxjs/toolkit"
import { persistStore,persistReducer } from "redux-persist"
import LocalStorage from "redux-persist/lib/storage"
import SessionStorage from "redux-persist/lib/storage/session"
import UserReducer from './accounts/users/UserSlice'
import CRUD_OperationsSlice from '../features/admin/CRUD_OperationsSlice'


const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const localStorageConfiguration = {
    key:'global storage',
    storage:LocalStorage,
    blackList:['user']
}

const sessionStorageConfiguration={
    key:'local storage',
    storage:SessionStorage,
    blackList:['user']
}

const rootReducer = combineReducers({
    crud:CRUD_OperationsSlice,
    user:UserReducer
})

const persistedReducer = persistReducer(localStorageConfiguration,rootReducer)

export const Store = configureStore({
    reducer:persistedReducer,
    middleware:customizedMiddleware
})

export const persistor = persistStore(Store)