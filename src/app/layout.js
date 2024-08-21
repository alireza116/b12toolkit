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
    const pathname = usePathname();
    const [value, setValue] = useState(0);
    const navBarRef = useRef(null);
    const [navBarHeight, setNavBarHeight] = useState(0);

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

    // Sync tab value with route
    useEffect(() => {
        const currentTabIndex = tabRoutes.indexOf(pathname);
        if (currentTabIndex !== -1) {
            setValue(currentTabIndex);
        }
    }, [pathname]);

    // handles tab value change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const bgColor = theme.palette.background.default;
    const borderColor = theme.palette.grey;
    const tabHeight = 70;

    // Responsive checks
    const isMdOrLarger = useMediaQuery(theme.breakpoints.up('md'));
    const taskEditorWidth = isMdOrLarger ? '25%' : '0'; // 1/6 when md or larger, hidden when smaller
    const contentWidth = isMdOrLarger ? "75%" : "100%";

    return (
        <html lang="en">
        <body className={inter.className}>
        <AppRoot>
            <Stack direction='column' sx={{height: '100vh', backgroundColor: "background.paper"}}>
                <NavBar ref={navBarRef}/>
                <main style={{
                    display: "flex",
                    width: '100%',
                    height: `calc(100vh - ${navBarHeight}px)`,
                }}>
                    <Stack sx={{backgroundColor: bgColor, width: contentWidth}}>
                        <Tabs id={"content-tabs"} value={value} onChange={handleChange} aria-label="content tabs"
                              role="navigation"
                              className={"border-b-2"}
                              variant="scrollable"
                              allowScrollButtonsMobile fullWidth>
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
                            {children}
                        </Box>
                    </Stack>
                    {isMdOrLarger && (
                        <Box className={`border-l-2`} sx={{
                            borderColor: borderColor,
                            width: taskEditorWidth
                        }}>
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