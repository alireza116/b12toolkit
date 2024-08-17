import React from "react";
import {Typography} from "@mui/material";
import ContentCard from "@/components/ContentCard/ContentCard";

const PageDataSections = ({pageData}) => {
    return (
        <div>
            {pageData.map((section, index) => (
                <div key={index}
                     className={`${index + 1 < pageData.length ? "border-b-2 border-gray-200" : "border-0"} pb-1 md:pb-4 pt:1 md:pt-4`}>
                    <Typography className={"mb-8"} variant={"h5"}>{`${index + 1}- ${section.title}`}</Typography>
                    <div className={"flex flex-wrap"}>
                        {section.content.map((sectionContent, index) => (
                            <ContentCard key={index} title={sectionContent.title} body={sectionContent.body}
                                         examples={sectionContent.examples} links={sectionContent.links}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PageDataSections;