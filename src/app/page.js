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
import StartPage from "@/pages/contentPages/StartPage";
import Foundations from "@/pages/contentPages/Foundations";
import AiRisks from "@/pages/contentPages/AiRisks";
import StudentCoach from "@/pages/contentPages/StudentCoach";
import Onboarding from "@/pages/contentPages/Onboarding";
import Ongoing from "@/pages/contentPages/Ongoing";
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
    const sideWidth = 500
    return (
        <main className={`flex flex-row w-full h-full`}>
            {/*<Button>Hello</Button>*/}
            <TabContext value={value}>
                <Stack>
                    <Box className={`w-full border-b-2`}
                         style={{width: `calc(100vw - ${sideWidth}px)`, backgroundColor: bgColor}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth"
                                 sx={{fontSize: "small"}}>
                            <Tab icon={<StartIcon/>} iconPosition="start" label="Start Here" {...a11yProps(0)} />
                            <Tab icon={<PriorityHighIcon/>} iconPosition="start"
                                 label="Foundations" {...a11yProps(1)} />
                            <Tab icon={<SmartToyIcon/>} iconPosition="start" label="AI Risks" {...a11yProps(2)} />
                            <Tab icon={<SchoolIcon/>} iconPosition={"start"}
                                 label="Students & Coaches" {...a11yProps(3)} />
                            <Tab icon={<PsychologyIcon/>} iconPosition={"start"} label="Onboarding" {...a11yProps(4)} />
                            <Tab icon={<RepeatIcon/>} iconPosition={"start"} label="Ongoing..." {...a11yProps(5)} />
                        </TabList>
                    </Box>
                    <Box
                        className={`pl-12 p-6  h-full overflow-y-auto `}
                        style={{width: `calc(100vw - ${sideWidth}px)`, backgroundColor: bgColor}}>

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
            <Box className={`w-[${sideWidth}px] border-l-2 border-[${borderColor}] p-6 overflow-y-auto`}
                 style={{backgroundColor: bgColor}}>
                <TaskEditor></TaskEditor>
            </Box>

        </main>
    );
}

export default HomePage;