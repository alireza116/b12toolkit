// src/theme.js
import {createTheme} from '@mui/material/styles';

const colors = {
    primary: '#F58025', // Orange
    secondary: '#8BAF1F', // Dark Green
    dark: '#5d5d5d', // Dark Blue/Black
    light: '#F7F7F7', // Light Grey
    white: '#ffffff' // White
};

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
        color: colors.dark,
    },
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    border: '8px solid grey',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Roboto'
                },
            },
        },
    },
    palette: {
        primary: {
            main: colors.primary,
            light: '#FFA05A', // Lighter shade of orange
            dark: '#B35300', // Darker shade of orange
            contrastText: colors.dark,
        },
        secondary: {
            main: colors.secondary,
            light: '#B2D153', // Lighter shade of dark green
            dark: '#597B00', // Darker shade of dark green
            contrastText: colors.white,
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: colors.white,
        },
        warning: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
            contrastText: colors.white,
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        background: {
            default: colors.light,
            paper: colors.white,
        },
        neutral: {
            main: colors.dark,
            light: '#333333',
            dark: '#111111',
            contrastText: colors.light
        },

        critical: {
            main: "#A12A2A",
            contrastText: "#FFFFFF"
        },
        high: {
            main: "#B96E2D",
            contrastText: "#FFFFFF"
        },
        medium: {
            main: "#B8A331",
            contrastText: "#000000"
        },
        low: {
            main: "#4A7851",
            contrastText: "#FFFFFF"
        }

    },
});

export default theme;
