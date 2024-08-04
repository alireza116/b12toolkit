import React, { createContext, useContext } from 'react';
import riskStore from './RiskStore';

const RiskStoreContext = createContext();

export const RiskStoreProvider = ({ children }) => {
    return (
        <RiskStoreContext.Provider value={riskStore}>
            {children}
        </RiskStoreContext.Provider>
    );
};

export const useRiskStore = () => {
    return useContext(RiskStoreContext);
};