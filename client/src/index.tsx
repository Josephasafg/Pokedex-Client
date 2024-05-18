import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Store} from "redux"
import projectReducer from "./store/reducer"
import {DispatchType, PageAction, PageState, PokedexActions} from "./types";
import {Provider} from "react-redux";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {PersistGate} from 'redux-persist/integration/react'
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';


const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, projectReducer);


// const store: Store<PageState, PokedexActions> & {
//     dispatch: DispatchType
// } = configureStore({
//     reducer: persistedReducer, middleware: [thunk], devTools: process.env.NODE_ENV !== 'production',
// })

const store = configureStore({
    reducer: persistedReducer,
    middleware: () => new Tuple(thunk, logger),
    devTools: process.env.NODE_ENV !== 'production',
});

let persistor = persistStore(store)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
