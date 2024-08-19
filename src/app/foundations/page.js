import {Container} from "@mui/material";
import {foundations} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    
    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={foundations}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;