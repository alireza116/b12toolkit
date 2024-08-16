// src/components/Chips/LinkChips.js
import React from 'react';
import {Avatar, Box, Chip, Link} from '@mui/material';

// const StyledAvatar = styled(Avatar)(({theme}) => ({
//     width: 24,
//     height: 24,
//     fontSize: '0.75rem',
//     // backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     marginLeft: theme.spacing(1),
//     '&:hover': {
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// const NoUnderlineLink = styled(Link)({
//     textDecoration: 'none',
// });

const LinkChips = ({links}) => {
    return (
        <Chip
            label={
                <Box display="flex" alignItems="center">
                    Learn More:
                    {links.map((link, index) => (
                        <Link style={{textDecoration: 'none'}} key={index} href={link} target="_blank"
                              rel="noopener noreferrer">
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '0.75rem',
                                // backgroundColor: theme.palette.primary.main,
                                color: "primary.contrastText",
                                marginLeft: 1,
                                '&:hover': {
                                    backgroundColor: "background.default",
                                },
                            }}>{index + 1}</Avatar>
                        </Link>
                    ))}
                </Box>
            }
        />
    );
};

export default LinkChips;