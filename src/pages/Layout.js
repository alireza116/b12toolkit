
import {Container, Stack} from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import useB12Theme from "@/hooks/useB12Theme";
const Layout = ({ children }) => {
    const theme = useB12Theme();
    console.log(theme);
    return (
        <Stack direction='column' sx={{height: '100%', backgroundColor: theme.palette.background.paper}}>

            <NavBar></NavBar>
            <Container sx={{flexGrow: 1}}>
                {children}
            </Container>
        </Stack>

    );
}

export default Layout