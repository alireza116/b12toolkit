import {Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const PageContent = () => {
    const theme = useTheme()
    return (
        <Container maxWidth={"md"} className="w-full flex-column">
            <Typography className={"mb-4"} variant={"h4"}>Onboarding Content Goes Here</Typography>
        </Container>
    );
}

export default PageContent;