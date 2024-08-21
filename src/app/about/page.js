import React from 'react';
import {Container, Typography} from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" className={"p-8"}>
            <Typography variant={"h5"}>This toolkit is focused on developing AI tools that assist in coaching and
                advising for college students,
                emphasizing ethical and responsible AI use. The toolkit guides developers and decision-makers through
                the process of creating or adopting AI chatbots, with tools and resources designed to identify and
                mitigate risks. It serves as a companion throughout the AI coach development journey, offering insights
                into best practices and strategies for responsible AI implementation.</Typography>
            <Typography variant="h5" paragraph>
                This toolkit is created by Beyond 12. Content and Development by Alireza Karduni and Atefeh Mahdavi.
            </Typography>
        </Container>
    );
};

export default About;