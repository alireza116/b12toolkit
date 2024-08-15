// src/stores/rootStore.js
import {createContext, useContext} from 'react';
import riskStore from '@/stores/riskStore'; //
import taskStore from '@/stores/taskStore';

class RootStore {
    constructor() {
        this.riskStore = riskStore; // Add other stores
        this.taskStore = taskStore;
    }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const RootStoreProvider = ({children}) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => useContext(RootStoreContext);

export const useRiskStore = () => useContext(RootStoreContext).riskStore; // Add hooks for other stores

export const useTaskStore = () => useContext(RootStoreContext).taskStore; // Add hooks for other stores