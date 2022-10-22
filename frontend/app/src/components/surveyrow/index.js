import React from 'react';
import Chart from "react-apexcharts";

import { Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const SurveyRow = ({ question }) => {
    return (
        <Box sx={{ 'display': 'flex', alignItems: 'center', flexGrow: 1, mb: 3 }}>
            <Box>
                <Typography variant="body">
                    {question}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                <FormControl>
                    <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="3"
                    >
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Not at all"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="A little"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="Somewhat"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="It's annoying"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio />}
                            label="I can't stand it"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

export default SurveyRow
