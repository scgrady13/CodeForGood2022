import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Box } from '@mui/material';
// components
import SurveyRow from '../components/surveyrow';

const QUESTIONS = [
    "Loud Sounds",
    "Fast Motions",
    "Abrupt Changes",
    "When people talk to you",
    "Touches"
]

export default function UserOnboardingPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
        <Box sx={{ pt: 5 }}>
            <Typography variant="h3" sx={{ mb: 5 }}>
                Let's get to know about you
            </Typography>
            {QUESTIONS.map((q) => {
                return (
                    <SurveyRow question={q} />
                )
            })}
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Button sx={{ mt: 5 }} variant="outlined">Submit</Button>
        </Box>
      </Container>
    </>
  );
}
