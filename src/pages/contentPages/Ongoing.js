import {Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const PageContent = () => {
    const theme = useTheme()
    return (
        <Container maxWidth={"md"} className="w-full">
            <Typography variant={"h4"}>Ongoing Content Goes Here</Typography>
        </Container>
    );
}

export default PageContent;