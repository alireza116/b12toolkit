'use client'
import {Button, Container, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {useTour} from '@reactour/tour'

const PageContent = () => {
    const theme = useTheme();
    const {setIsOpen} = useTour()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleStartTour = () => {
        setIsOpen(true);
    };

    return (
        <Container maxWidth={"md"} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            color: "text.primary"
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
            <Button variant="contained" color="neutral" onClick={handleStartTour} sx={{marginTop: 2}}>
                Click here to learn more
            </Button>

        </Container>
    );
}

export default PageContent;