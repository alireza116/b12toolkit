'use client'
import RiskComponent from "@/components/TestRiskState/TestRiskState";
import Card from "@/components/Card/Card";
import {useTheme} from "@mui/material/styles";
import {Box, Stack, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import {useState} from "react";
import {TabList} from "@mui/lab";
import CustomTabPanel from "@/components/TabPanel/TabPanel";


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
    const bgColor = theme.palette.background.default;
    const sideWidth = 300
    return (
        <main className={`flex flex-row w-full h-full`}>
            {/*<Button>Hello</Button>*/}
            <TabContext value={value}>
                <Stack>
                    <Box className="w-full border-2 border-white rounded-2xl"
                         style={{width: `calc(100vw - ${sideWidth}px)`, backgroundColor: bgColor}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                            <Tab label="Start Here" {...a11yProps(0)} />
                            <Tab label="Foundational Activities" {...a11yProps(1)} />
                            <Tab label="AI Risks" {...a11yProps(2)} />
                            <Tab label="Students and Coaches" {...a11yProps(3)} />
                            <Tab label="Onboarding" {...a11yProps(4)} />
                            <Tab label="Ongoing Interactions" {...a11yProps(5)} />
                        </TabList>
                    </Box>
                    <Box
                        className="pl-12 p-6 border-2 border-white rounded-2xl h-full overflow-y-auto "
                        style={{width: `calc(100vw - ${sideWidth}px)`, backgroundColor: bgColor}}>
                        <CustomTabPanel value={value} index={0}>
                            <Card title="Alireza">
                                Hello
                            </Card>

                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            Item Two
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            Item Three
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            Item 4
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            Item 123
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>
                            Item 6666
                        </CustomTabPanel>

                    </Box>
                </Stack>
            </TabContext>
            <Box className={`w-[${sideWidth}px] border-2 border-white rounded-2xl p-6 overflow-y-auto`}
                 style={{backgroundColor: bgColor}}>
                <RiskComponent/>
            </Box>

        </main>
    );
}

export default HomePage;