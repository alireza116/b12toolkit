// a card that displays a text on top and has content in the body, width of card is 100%

import React from "react";
import {Card as MuiCard, CardContent, Typography} from "@mui/material";

const Card = ({title, children}) => {
    return (
        // a card that displays a text on top and has content in the body, width of card is 100%
        <MuiCard className="w-1/4 h-1/4 shadow-none">

            <CardContent>

                <Typography variant="h5">{title}</Typography>
                {children}

            </CardContent>
        </MuiCard>
    );

}

export default Card;