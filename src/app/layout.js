// Ensure all imports are correct
'use client'
import {Inter} from "next/font/google";
import "./globals.css";
import AppRoot from "@/app/AppRoot";
import {Box, Stack, Tab, Tabs, useMediaQuery} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import StartIcon from "@mui/icons-material/Start";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RepeatIcon from "@mui/icons-material/Repeat";
import Link from 'next/link'
import {usePathname} from "next/navigation";
import TaskEditor from "@/components/TaskEditor/TaskEditor";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";
import NavBar from "@/components/NavBar/NavBar";

// Load the Inter font with Latin subset
const inter = Inter({subsets: ["latin"]});

// Component for rendering a tab that acts as a link
function LinkTab(props) {
    return (
        <Tab
            component={Link}
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

// Define prop types for LinkTab component
LinkTab.propTypes = {
    selected: PropTypes.bool,
};

// Function to generate accessibility props for tabs
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Root layout component for the application
export default function RootLayout({children}) {
    const pathname = usePathname(); // Get the current path
    const [value, setValue] = useState(0); // State to manage the selected tab
    const navBarRef = useRef(null); // Ref to store the NavBar element
    const [navBarHeight, setNavBarHeight] = useState(0); // State to store the height of the NavBar

    // Effect to handle resizing and setting the NavBar height
    useEffect(() => {
        const handleResize = () => {
            if (navBarRef.current) {
                setNavBarHeight(navBarRef.current.offsetHeight);
            }
        };

        // Set initial height
        handleResize();

        // Update height on window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Mapping routes to tab index
    const tabRoutes = ['/', '/foundations', '/airisks', '/studentcoach', '/interactions', '/reassessment'];

    // Effect to sync tab value with the current route
    useEffect(() => {
        const currentTabIndex = tabRoutes.indexOf(pathname);
        if (currentTabIndex !== -1) {
            setValue(currentTabIndex);
        }
    }, [pathname]);

    // Handle tab value change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme(); // Get the current theme
    const bgColor = theme.palette.background.default; // Background color from theme
    const borderColor = theme.palette.grey; // Border color from theme
    const tabHeight = 70; // Height of the tabs

    // Responsive checks
    const isMdOrLarger = useMediaQuery(theme.breakpoints.up('md')); // Check if the screen size is medium or larger
    const taskEditorWidth = isMdOrLarger ? '25%' : '0'; // Width of the task editor based on screen size
    const contentWidth = isMdOrLarger ? "75%" : "100%"; // Width of the content area based on screen size

    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRoot>
            <Stack direction='column' sx={{height: '100vh', backgroundColor: "background.paper"}}>
                {/* Navigation bar */}
                <NavBar ref={navBarRef}/>
                <main style={{
                    display: "flex",
                    width: '100%',
                    height: `calc(100vh - ${navBarHeight}px)`,
                }}>
                    {/* Main content area */}
                    <Stack sx={{backgroundColor: bgColor, width: contentWidth}}>
                        <Tabs id={"content-tabs"} value={value} onChange={handleChange} aria-label="content tabs"
                              role="navigation"
                              className={"border-b-2"}
                              variant="scrollable"
                              allowScrollButtonsMobile fullWidth>
                            {/* Define each tab with its respective icon and label */}
                            <LinkTab href={"/"} icon={<StartIcon/>} className={"start-here-tab"} iconPosition="start"
                                     label="Start Here" {...a11yProps(0)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <LinkTab href={"/foundations"} icon={<PriorityHighIcon/>} className={"foundations-tab"}
                                     iconPosition="start"
                                     label="Foundations" {...a11yProps(1)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <LinkTab href={"/airisks"} icon={<SmartToyIcon/>} iconPosition="start"
                                     label="AI Risks" {...a11yProps(2)}
                                     sx={{minWidth: "fit-content", flex: 1}}/>
                            <LinkTab href={"/studentcoach"} icon={<SchoolIcon/>} iconPosition={"start"}
                                     label="Students & Coaches" {...a11yProps(3)}
                                     sx={{minWidth: "fit-content", flex: 1}}/>
                            <LinkTab href={"/interactions"} icon={<PsychologyIcon/>} iconPosition={"start"}
                                     label="Interactions" {...a11yProps(4)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <LinkTab href={"/reassessment"} icon={<RepeatIcon/>} iconPosition={"start"}
                                     label="Reassessment" {...a11yProps(5)}
                                     sx={{minWidth: "fit-content", flex: 1}}/>
                        </Tabs>
                        <Box
                            className={"h-full w-full overflow-y-auto"}
                            id="content-side">
                            {/* Render the children components */}
                            {children}
                        </Box>
                    </Stack>
                    {isMdOrLarger && (
                        <Box className={`border-l-2`} sx={{
                            borderColor: borderColor,
                            width: taskEditorWidth
                        }}>
                            {/* Task editor component */}
                            <TaskEditor tabHeight={tabHeight}/>
                        </Box>
                    )}
                </main>
            </Stack>
        </AppRoot>
        </body>
        </html>
    );
}