import {Container} from "@mui/material";
import {studentCoach} from "@/data/content-links.js";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {

    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={studentCoach}>

            </PageContentSections>
        </Container>
    );
}

export default PageContent;