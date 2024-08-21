import React from "react";
import {Box, Typography} from "@mui/material";
import ContentCard from "@/components/ContentCard/ContentCard";

const PageDataSections = ({pageData}) => {
    return (
        <div>
            {pageData.map((section, index) => (
                <Box key={index}
                     className={`${index + 1 < pageData.length ? "border-b-2 border-gray-200" : "border-0"} pb-1 md:pb-4 pt-3 md:pt-4`}
                     sx={{color: "text.primary"}}>
                    <Typography className={"mb-4"} variant={"h5"}>{`${index + 1}- ${section.title}`}</Typography>
                    {/*<div className={"flex flex-wrap gap-4"}>*/}
                    <div className={"grid gap-4 md:grid-cols-1 lg:grid-cols-2"}>
                        {section.content.map((sectionContent, index) => (
                            <ContentCard key={index} title={sectionContent.title} body={sectionContent.body}
                                         examples={sectionContent.examples} links={sectionContent.links}/>
                        ))}
                    </div>
                </Box>
            ))}
        </div>
    );
}

export default PageDataSections;