import {Container} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {aiRisks} from "@/data/content-links";
import PageContentSections from "@/components/PageContentSections/PageContentSections";

const PageContent = () => {
    const theme = useTheme()
    return (
        <Container maxWidth={"lg"} className="w-full">
            <PageContentSections pageData={aiRisks}></PageContentSections>


        </Container>
    );
}

export default PageContent;