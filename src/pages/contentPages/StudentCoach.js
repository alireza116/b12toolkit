import {Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {studentCoach} from "@/data/content";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const pageData = studentCoach;
    const theme = useTheme()
    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={pageData}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;