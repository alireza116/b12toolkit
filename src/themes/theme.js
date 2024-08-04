// src/theme.js
import { createTheme } from '@mui/material/styles';

const colors = {
    primary: '#1c595f',
    secondary: '#a6091b'
};

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            light: '#c96e58',
            dark: '#6f2c16',
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.secondary,
            light: '#a0897b',
            dark: '#4e3b35',
            contrastText: '#ffffff',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#ffffff',
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
            contrastText: '#ffffff',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        background: {
            default: '#fff',
            paper: '#eee'
        }
    },
});


export default theme;