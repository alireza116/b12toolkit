import {Stack} from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import {useTheme} from "@mui/material/styles";
import {useEffect, useRef, useState} from "react";

const Layout = ({children}) => {
    const theme = useTheme();
    const navBarRef = useRef(null);
    const [navBarHeight, setNavBarHeight] = useState(0);
    console.log(navBarHeight)
    useEffect(() => {
        const handleResize = () => {
            console.log("test");
            if (navBarRef.current) {
                setNavBarHeight(navBarRef.current.offsetHeight);
            }
        };

        // Set initial height
        handleResize();

        // Update height on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Stack direction='column' sx={{height: '100vh', backgroundColor: theme.palette.background.paper}}>
            <NavBar ref={navBarRef}/>
            <div style={{
                width: '100%',
                height: `calc(100vh - ${navBarHeight}px)`,
            }}
            >
                {children}
            </div>
        </Stack>
    );
}

export default Layout;