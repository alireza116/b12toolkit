// src/stores/rootStore.js
import { createContext, useContext } from 'react';
import counterStore from './counterStore';
import riskStore from './riskStore'; //

class RootStore {
    constructor() {
        this.counterStore = counterStore;
        this.riskStore = riskStore; // Add other stores
    }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const RootStoreProvider = ({ children }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => useContext(RootStoreContext);
export const useCounterStore = () => useContext(RootStoreContext).counterStore;
export const useRiskStore = () => useContext(RootStoreContext).riskStore; // Add hooks for other stores