import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppUserData,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
          <Box>
            <Typography variant="h4">
              Hi, Courtney
            </Typography>

            <Typography variant="h3" sx={{ mb: 5 }}>
              10/22 Session
            </Typography>
          </Box>
          <Box>
            <Button sx={{ ml: 3 }} variant="outlined">Add Student</Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>



          <Grid item xs={12} sm={12} md={12}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [1,2,2,3],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Age Group"
              chartData={[
                { label: '8-13', value: 3124 },
                { label: '13-16', value: 5435 },
                { label: '16-21', value: 2455 },
                { label: '21+', value: 2314 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Average Improvement Rate"
              subheader="(+1.42%) than last month"
              chartData={[
                { label: 'Clay', value: 12 },
                { label: 'Miguel', value: 14 },
                { label: 'James', value: 12 },
                { label: 'Tim', value: 10 },
                { label: 'charles', value: 13 },
                { label: 'roberts', value: 14 },
                { label: 'Sam', value: 13 },
                { label: 'Daniel', value: 14 },
                
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Where Training is Needed"
              chartLabels={['10' ,'20', '30', '40', '50', '60']}
              chartData={[
                { name: 'Hearing', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Vision', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Concentration', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(3)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="To Do"
              list={[...Array(6)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Session Schdule"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Session 1',
                  'Session 2',
                  'Session 3',
                  'Session 4',
                  'Session 5'
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 3232,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 3412,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 4113,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 4432,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Agenda For The Day"
              list={[
                { id: '1', label: 'Recap from yesterday class' },
                { id: '2', label: 'DJ with' },
                { id: '3', label: 'Lunch with volunteers' },
                { id: '4', label: 'Wrap up for the day' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
