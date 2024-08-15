import {Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {ongoing} from "@/data/content";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const pageData = ongoing;
    const theme = useTheme()
    return (
        <Container maxWidth={"md"} className="w-full">
            <PageContentSections pageData={pageData}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;