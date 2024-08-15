'use client'
import {useTheme} from "@mui/material/styles";
import {Box, Stack, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import {useState} from "react";
import {TabList} from "@mui/lab";
import CustomTabPanel from "@/components/TabPanel/TabPanel";
import StartIcon from '@mui/icons-material/Start';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RepeatIcon from '@mui/icons-material/Repeat';
import StartPage from "@/contentPages/tabPages/StartPage";
import Foundations from "@/contentPages/tabPages/Foundations";
import AiRisks from "@/contentPages/tabPages/AiRisks";
import StudentCoach from "@/contentPages/tabPages/StudentCoach";
import Onboarding from "@/contentPages/tabPages/Onboarding";
import Ongoing from "@/contentPages/tabPages/Ongoing";
import TaskEditor from "@/components/TaskEditor/TaskEditor";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const HomePage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const theme = useTheme()
    const bgColor = theme.palette.background.white;
    const borderColor = theme.palette.grey;
    const sideWidth = 400
    const tabHeight = 70
    return (
        <main className={`flex w-full h-full`}>

            <TabContext value={value}>
                <Stack className={"content-side w-full md:w-4/6"}
                       sx={{backgroundColor: bgColor}}>
                    <Box className={`w-full border-b-2`}>

                        <TabList onChange={handleChange} aria-label="lab API tabs example"
                                 variant="scrollable" scrollButtons="auto"
                                 sx={{fontSize: "small"}}
                                 TabIndicatorProps={{sx: {display: 'none'}}}
                                 className={" content-tabs"}>
                            <Tab icon={<StartIcon/>} className={"start-here-tab"} iconPosition="start"
                                 label="Start Here" {...a11yProps(0)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <Tab icon={<PriorityHighIcon/>} className={"foundations-tab"} iconPosition="start"
                                 label="Foundations" {...a11yProps(1)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <Tab icon={<SmartToyIcon/>} iconPosition="start" label="AI Risks" {...a11yProps(2)}
                                 sx={{minWidth: "fit-content", flex: 1}}/>
                            <Tab icon={<SchoolIcon/>} iconPosition={"start"}
                                 label="Students & Coaches" {...a11yProps(3)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <Tab icon={<PsychologyIcon/>} iconPosition={"start"}
                                 label="Interactions" {...a11yProps(4)} sx={{minWidth: "fit-content", flex: 1}}/>
                            <Tab icon={<RepeatIcon/>} iconPosition={"start"} label="Reassessment" {...a11yProps(5)}
                                 sx={{minWidth: "fit-content", flex: 1}}/>
                        </TabList>
                    </Box>
                    <Box
                        className={`pl-12 p-4 h-full w-full overflow-y-auto `}
                        style={{backgroundColor: bgColor}}>

                        <CustomTabPanel value={value} index={0}>
                            <StartPage>

                            </StartPage>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Foundations></Foundations>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <AiRisks></AiRisks>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <StudentCoach></StudentCoach>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <Onboarding></Onboarding>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>
                            <Ongoing></Ongoing>
                        </CustomTabPanel>

                    </Box>
                </Stack>
            </TabContext>
            <Box className={`border-l-2 border-[${borderColor} hidden md:block w-2/6 `}
            >
                <TaskEditor tabHeight={tabHeight}></TaskEditor>
            </Box>

        </main>
    );
}

export default HomePage;