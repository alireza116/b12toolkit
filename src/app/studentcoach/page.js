import {Container} from "@mui/material";
import {studentCoach} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const pageData = studentCoach;

    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={pageData}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;