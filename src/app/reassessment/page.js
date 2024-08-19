import {Container} from "@mui/material";
import {ongoing} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {


    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={ongoing}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;