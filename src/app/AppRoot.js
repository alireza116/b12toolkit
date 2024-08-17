'use client'
import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import theme from '@/themes/theme';
import {RootStoreProvider} from "@/stores/RootStore";
import TourProvider from "@/components/Tour/Tour";

const AppRoot = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <RootStoreProvider>
                <TourProvider>
                    {children}
                </TourProvider>
            </RootStoreProvider>
        </ThemeProvider>
    )

}

export default AppRoot