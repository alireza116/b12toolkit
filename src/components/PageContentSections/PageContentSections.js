import React from "react";
import {Box, Typography} from "@mui/material";
import ContentCard from "@/components/ContentCard/ContentCard";

// Component to render sections of a page with their respective content
const PageDataSections = ({pageData}) => {
    return (
        <div>
            {pageData.map((section, index) => (
                <Box
                    key={index}
                    // Apply bottom border to all sections except the last one
                    className={`${index + 1 < pageData.length ? "border-b-2 border-gray-200" : "border-0"} pb-1 md:pb-4 pt-3 md:pt-4`}
                    sx={{color: "text.primary"}}
                >
                    {/* Section title */}
                    <Typography className={"mb-4"} variant={"h5"}>
                        {`${index + 1}- ${section.title}`}
                    </Typography>
                    {/* Grid layout for content cards */}
                    <div className={"grid gap-4 md:grid-cols-1 lg:grid-cols-2"}>
                        {section.content.map((sectionContent, index) => (
                            <ContentCard
                                key={index}
                                title={sectionContent.title}
                                body={sectionContent.body}
                                examples={sectionContent.examples}
                                links={sectionContent.links}
                            />
                        ))}
                    </div>
                </Box>
            ))}
        </div>
    );
}

export default PageDataSections;