import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const PageContent = () => {
    const theme = useTheme()
    return (
        <Box className="w-full">
            <Typography variant={"h4"} color={theme.palette.text.primary}>qwe</Typography>
            <Typography variant={"h4"} color={theme.palette.text.primary}>qwe</Typography>
            <Typography variant={"h4"} color={theme.palette.text.primary}>qwe</Typography>

        </Box>
    );
}

export default PageContent;