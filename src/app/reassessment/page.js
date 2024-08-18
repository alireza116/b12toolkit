import {Container} from "@mui/material";
import {ongoing} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const pageData = ongoing;

    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={pageData}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;