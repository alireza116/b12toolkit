// src/stores/CounterStoreContext.js
import React, { createContext, useContext } from 'react';
import counterStore from './CounterStore';

const CounterStoreContext = createContext();

export const CounterStoreProvider = ({ children }) => {
    return (
        <CounterStoreContext.Provider value={counterStore}>
            {children}
        </CounterStoreContext.Provider>
    );
};

export const useCounterStore = () => {
    return useContext(CounterStoreContext);
};