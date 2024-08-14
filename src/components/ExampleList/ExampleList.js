import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";

const ExampleList = ({items}) => {
    return (
        <List sx={{padding: 0, listStyleType: 'disc', pl: 4}}>
            {items.map((item, index) => (
                <ListItem key={index} sx={{padding: '2px 0', display: 'list-item', marginBottom: 0}}>
                    <ListItemText primaryTypographyProps={{variant: 'body2'}} primary={item}/>
                </ListItem>
            ))}
        </List>
    );
}

export default ExampleList;