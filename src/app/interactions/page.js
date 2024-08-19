import {Container} from "@mui/material";
import {onboarding} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {

    return (
        <Container maxWidth={"lg"} className="w-full flex-column">
            <PageContentSections pageData={onboarding}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;