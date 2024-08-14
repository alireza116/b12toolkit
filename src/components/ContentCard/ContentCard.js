import React from "react";
import {Card as MuiCard, CardContent, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ExampleList from "@/components/ExampleList/ExampleList";

const ContentCard = ({title, body, examples, children}) => {
    const theme = useTheme();
    return (
        <div className={"w-1/2 pr-4 pb-4"}>
            <MuiCard className="w-full h-full shadow-none p-4 m-0"
                     sx={{background: theme.palette.background.default}}>
                <CardContent className="flex flex-col h-full max-h-[500px] flex-grow">
                    <Typography variant="h5" className="mb-4">{title}</Typography>
                    <div className="flex-grow overflow-y-auto pt-4 border-t-2">
                        <Typography variant="h6" className="mt-4">Why?</Typography>
                        <Typography variant={"body2"}>{body}</Typography>
                        {examples && (
                            <div>
                                <Typography variant="h6" className="mt-4">Examples:</Typography>
                                <ExampleList items={examples}/>
                            </div>
                        )}
                    </div>
                </CardContent>
            </MuiCard>
        </div>
    );
}

export default ContentCard;