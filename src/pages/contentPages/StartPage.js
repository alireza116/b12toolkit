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
            <Typography variant={"h4"} className={"mb-4"}>
                Hi!
            </Typography>
            <Typography variant={"h5"} className={"mb-4"}>This is a toolkit to help develop your AI coach/advisors
                for students more ethically and responsibly. It is designed as a companion as you develop your chatbot,
                or you decide whether to adopt one, for you to
                identify what actions you can take to develop your AI coach.
            </Typography>
            <Typography variant={"body1"}> Click below for a tour on how this toolkit will help you </Typography>
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