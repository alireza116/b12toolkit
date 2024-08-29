'use client'
import {Button, Container, Typography} from "@mui/material";
import {useTour} from '@reactour/tour'

const PageContent = () => {
    const {setIsOpen} = useTour()

    const handleStartTour = () => {
        setIsOpen(true);
    };

    return (
        <Container maxWidth={"md"} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            pt: 4,
            color: "text.primary"
        }}>
            <Typography variant={"h5"} className={"mb-4"}>
                Hi!
            </Typography>
            <Typography variant={"h5"} className={"mb-4"}>This is a toolkit to help you consider responsible and ethical
                principles of using or developing generative AI tools for student coaching and advising. It is designed
                as a companion for your team to
                identify what actions you can take to prevent and mitigate risks inherent in such tools.
            </Typography>
            <Typography variant={"h5"}> Click below for a tour on how this toolkit will help you </Typography>
            <Button variant="contained" color="neutral" onClick={handleStartTour} sx={{marginTop: 2}}>
                Click here to learn more
            </Button>

        </Container>
    );
}

export default PageContent;