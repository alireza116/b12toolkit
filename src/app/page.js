'use client'
// import {useTheme} from "@mui/material/styles";
// import {Box, Stack, Tab} from "@mui/material";
// import TabContext from '@mui/lab/TabContext';
// import {useState} from "react";
// import {TabList} from "@mui/lab";
// import CustomTabPanel from "@/components/TabPanel/TabPanel";
// import StartIcon from '@mui/icons-material/Start';
// import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import SchoolIcon from '@mui/icons-material/School';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import StartPage from "@/contentPages/tabPages/StartPage";
// import Foundations from "@/contentPages/tabPages/Foundations";
// import AiRisks from "@/contentPages/tabPages/AiRisks";
// import StudentCoach from "@/contentPages/tabPages/StudentCoach";
// import Onboarding from "@/contentPages/tabPages/Onboarding";
// import Ongoing from "@/contentPages/tabPages/Ongoing";
// import TaskEditor from "@/components/TaskEditor/TaskEditor";
//
// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }
//
//
// const HomePage = () => {
//     const [value, setValue] = useState(0);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//
//     const theme = useTheme()
//     const bgColor = theme.palette.background.white;
//     const borderColor = theme.palette.grey;
//     const sideWidth = 400
//     const tabHeight = 70
//     return (
//         <main className={`flex w-full h-full`}>
//
//             <TabContext value={value}>
//                 <Stack className={"content-side w-full md:w-4/6"}
//                        sx={{backgroundColor: bgColor}}>
//                     <Box className={`w-full border-b-2`}>
//
//                         <TabList onChange={handleChange} aria-label="lab API tabs example"
//                                  variant="scrollable" scrollButtons="auto"
//                                  sx={{fontSize: "small"}}
//                                  TabIndicatorProps={{sx: {display: 'none'}}}
//                                  className={" content-tabs"}>
//                             <Tab icon={<StartIcon/>} className={"start-here-tab"} iconPosition="start"
//                                  label="Start Here" {...a11yProps(0)} sx={{minWidth: "fit-content", flex: 1}}/>
//                             <Tab icon={<PriorityHighIcon/>} className={"foundations-tab"} iconPosition="start"
//                                  label="Foundations" {...a11yProps(1)} sx={{minWidth: "fit-content", flex: 1}}/>
//                             <Tab icon={<SmartToyIcon/>} iconPosition="start" label="AI Risks" {...a11yProps(2)}
//                                  sx={{minWidth: "fit-content", flex: 1}}/>
//                             <Tab icon={<SchoolIcon/>} iconPosition={"start"}
//                                  label="Students & Coaches" {...a11yProps(3)} sx={{minWidth: "fit-content", flex: 1}}/>
//                             <Tab icon={<PsychologyIcon/>} iconPosition={"start"}
//                                  label="Interactions" {...a11yProps(4)} sx={{minWidth: "fit-content", flex: 1}}/>
//                             <Tab icon={<RepeatIcon/>} iconPosition={"start"} label="Reassessment" {...a11yProps(5)}
//                                  sx={{minWidth: "fit-content", flex: 1}}/>
//                         </TabList>
//                     </Box>
//                     <Box
//                         className={`pl-12 p-4 h-full w-full overflow-y-auto `}
//                         style={{backgroundColor: bgColor}}>
//
//                         <CustomTabPanel value={value} index={0}>
//                             <StartPage/>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={1}>
//                             <Foundations/>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={2}>
//                             <AiRisks/>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={3}>
//                             <StudentCoach/>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={4}>
//                             <Onboarding/>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={5}>
//                             <Ongoing/>
//                         </CustomTabPanel>
//
//                     </Box>
//                 </Stack>
//             </TabContext>
//             <Box className={`border-l-2 border-[${borderColor} hidden md:block w-2/6 `}
//             >
//                 <TaskEditor tabHeight={tabHeight}></TaskEditor>
//             </Box>
//
//         </main>
//     );
// }
//
// export default HomePage;

import {Button, Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import Joyride from "react-joyride";

const PageContent = () => {
    const theme = useTheme();
    const [steps, setSteps] = useState([
        {
            disableBeacon: true,
            target: ".content-side",
            content: "In this part of the page you will read information about responsible AI development. It gives you a step-by-step guide to help you create your AI coach tool.",
        },
        {target: ".content-tabs", content: "Using these tabs, you can steps through and follow the toolkit."},
        {
            target: ".foundations-tab",
            content: "Here you will go through some foundational activities. Most notably. you will start listing tasks that your AI coach will perform. As this is designed to be a group project, you will gather other stakeholders to help you with this.",
        },
        {
            target: ".task-0",
            content: "This is a task card. All task cards will be listed in this side of the page as you add them.",
        },
        {
            target: ".create-task",
            content: "You can click on this button to create a new task card.",
        },
        {
            target: ".task-0-description",
            content: "This is the description of the task. You can edit this by clicking on the edit button.",
        },
        {
            target: ".task-0-risks",
            content: "This is the risk associated with the task. You can add new risks associated with the task by clicking on the add risk button.",
        },
        {
            target: ".task-0-risk-0",
            content: "These are the risks associated with the task. You can click on a chip. By clicking a chip, you can add actions associated to it. The circle on the left side shows the number of actions assigned to mitigate or prevent this risk.",
        },
        {
            target: ".foundations-tab",
            content: "Now you can click on the foundations tab to move to the next step. And start the process!",
        },
    ]);
    const [run, setRun] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleStartTour = () => {
        setRun(true);
    };

    return (
        <Container maxWidth={"md"} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }}>
            <Typography variant={"h5"} className={"mb-4"}>
                Hi!
            </Typography>
            <Typography variant={"h5"} className={"mb-4"}>This is a toolkit to help develop your AI coach/advisors
                for students more ethically and responsibly. It is designed as a companion as you develop your chatbot,
                or you decide whether to adopt one, for you to
                identify what actions you can take to develop your AI coach.
            </Typography>
            <Typography variant={"h5"}> Click below for a tour on how this toolkit will help you </Typography>
            <Button variant="outlined" color="primary" onClick={handleStartTour} sx={{marginTop: 2}}>
                Click here to learn more
            </Button>
            {isMounted && (
                <Joyride
                    steps={steps}
                    run={run}
                    continuous
                    showProgress
                    showSkipButton
                    styles={{
                        options: {
                            zIndex: 10000,
                        },
                        buttonNext: {
                            border: `1px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            backgroundColor: 'transparent',
                        },
                        buttonBack: {
                            border: `1px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            backgroundColor: 'transparent',
                        },
                        buttonSkip: {
                            border: `1px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            backgroundColor: 'transparent',
                        },
                        tooltip: {
                            textAlign: 'left',
                        },
                        tooltipContent: {
                            textAlign: 'left',
                        },
                    }}
                />
            )}
        </Container>
    );
}

export default PageContent;