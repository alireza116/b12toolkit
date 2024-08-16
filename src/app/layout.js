'use client'
import {Inter} from "next/font/google";
import "./globals.css";
import AppRoot from "@/contentPages/AppRoot";
import {Box, Stack, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import StartIcon from "@mui/icons-material/Start";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RepeatIcon from "@mui/icons-material/Repeat";
import Link from "next/link";
import {usePathname} from 'next/navigation'; // Use usePathname from next/navigation
import TaskEditor from "@/components/TaskEditor/TaskEditor";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";

const inter = Inter({subsets: ["latin"]});

function LinkTab(props) {
    return (

        <Tab
            component={Link}
            aria-current={props.selected && 'page'}
            {...props}
        />

    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function RootLayout({children}) {
    const pathname = usePathname(); // Get the current path
    const [value, setValue] = useState(0);

    // Mapping routes to tab index
    const tabRoutes = ['/', '/foundations', '/airisks', '/studentcoach', '/interactions', '/reassessment'];

    // Sync tab value with route
    useEffect(() => {
        const currentTabIndex = tabRoutes.indexOf(pathname);
        if (currentTabIndex !== -1) {
            setValue(currentTabIndex);
        }
    }, [pathname]); // Update when pathname changes

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const bgColor = theme.palette.background.white;
    const borderColor = theme.palette.grey;
    const sideWidth = 400;
    const tabHeight = 70;

    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRoot>
            <main className={`flex w-full h-full`}>
                <Stack className={"content-side w-full md:w-4/6"}
                       sx={{backgroundColor: bgColor}}>
                    <Tabs value={value} onChange={handleChange} aria-label="content tabs" role="navigation">
                        <LinkTab href={"/"} icon={<StartIcon/>} className={"start-here-tab"} iconPosition="start"
                                 label="Start Here" {...a11yProps(0)} sx={{minWidth: "fit-content", flex: 1}}/>
                        <LinkTab href={"/foundations"} icon={<PriorityHighIcon/>} className={"foundations-tab"}
                                 iconPosition="start"
                                 label="Foundations" {...a11yProps(1)} sx={{minWidth: "fit-content", flex: 1}}/>
                        <LinkTab href={"/airisks"} icon={<SmartToyIcon/>} iconPosition="start"
                                 label="AI Risks" {...a11yProps(2)}
                                 sx={{minWidth: "fit-content", flex: 1}}/>
                        <LinkTab href={"/studentcoach"} icon={<SchoolIcon/>} iconPosition={"start"}
                                 label="Students & Coaches" {...a11yProps(3)} sx={{minWidth: "fit-content", flex: 1}}/>
                        <LinkTab href={"/interactions"} icon={<PsychologyIcon/>} iconPosition={"start"}
                                 label="Interactions" {...a11yProps(4)} sx={{minWidth: "fit-content", flex: 1}}/>
                        <LinkTab href={"/reassessment"} icon={<RepeatIcon/>} iconPosition={"start"}
                                 label="Reassessment" {...a11yProps(5)}
                                 sx={{minWidth: "fit-content", flex: 1}}/>
                    </Tabs>
                    <Box
                        className={`pl-12 p-4 h-full w-full overflow-y-auto `}
                        style={{backgroundColor: bgColor}}>
                        {children}
                    </Box>
                </Stack>
                <Box className={`border-l-2 border-[${borderColor} hidden md:block w-2/6 `}
                >
                    <TaskEditor tabHeight={tabHeight}></TaskEditor>
                </Box>
            </main>
        </AppRoot>
        </body>
        </html>
    );
}
