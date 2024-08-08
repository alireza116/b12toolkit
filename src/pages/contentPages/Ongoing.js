import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const PageContent = () => {
    const theme = useTheme()
    return (
        <Box className="w-full">
            <Typography variant={"h4"} color={theme.palette.text.primary}>asd</Typography>
            <Typography variant={"h4"} color={theme.palette.text.primary}>asd</Typography>
            <Typography variant={"h4"} color={theme.palette.text.primary}>asd</Typography>

        </Box>
    );
}

export default PageContent;