import {Container} from "@mui/material";
import {aiRisks} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {

    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={aiRisks}></PageContentSections>
        </Container>
    );
}

export default PageContent;