import React from "react";
import {Box, Card as MuiCard, CardContent, Typography} from "@mui/material";
import ExampleList from "@/components/ExampleList/ExampleList";
import LinkChips from "@/components/Chips/LinkChips";

const ContentCard = ({title, body, examples, links, children}) => {
    // const theme = useTheme();
    return (
        <div className={"w-full lg:w-1/2 pr-4 pb-4"}>
            <MuiCard className="w-full h-full shadow-none p-2 pb-0"
                     sx={{backgroundColor: "background.default"}}>
                <CardContent className="flex flex-col h-full max-h-[500px] flex-grow pb-0">
                    <Typography variant="h6" className="mb-4">{title}</Typography>
                    <div className="flex-grow overflow-y-auto border-t-2">
                        <Typography variant="h6" className="mt-4 mb-2">Why?</Typography>
                        <Typography variant={"body2"}>{body}</Typography>
                        {examples && (
                            <div>
                                <Typography variant="h6" className="mt-4">Examples:</Typography>
                                <ExampleList items={examples}/>
                            </div>
                        )}
                    </div>
                    {links && (<Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 4}}>
                        <LinkChips links={links}/>
                    </Box>)}
                </CardContent>
            </MuiCard>
        </div>
    );
}

export default ContentCard;