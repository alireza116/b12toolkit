import {Container} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {onboarding} from "@/data/content-links";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const pageData = onboarding;
    const theme = useTheme()
    return (
        <Container maxWidth={"lg"} className="w-full flex-column">
            <PageContentSections pageData={pageData}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;