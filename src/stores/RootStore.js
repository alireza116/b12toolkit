// src/stores/rootStore.js
import {createContext, useContext} from 'react';
import taskStore from '@/stores/TaskStore';

class RootStore {
    constructor() {
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


export const useTaskStore = () => useContext(RootStoreContext).taskStore; // Add hooks for other stores