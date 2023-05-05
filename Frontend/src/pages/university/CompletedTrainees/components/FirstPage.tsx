import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Radio,
    RadioGroup,
} from '@mui/material';
import './style.css';

import {FormControlLabel} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {FC, SyntheticEvent} from 'react';
import useCompletedTraineesController from '../hooks/useCompletedTraineesController';

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

interface EvaluationFormDialogProps {
    // isOpen: boolean;
    // currentTab: string;
    // handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
    // handleCloseDialog: () => void;
    // data?: Row[];
}

const EvaluationFormDialog: FC<EvaluationFormDialogProps> = ({}) => {
    const {
        response,
        isOpen,
        currentTab,
        handleChangeTab,
        open,
        evaluationTrainingReport
    } = useCompletedTraineesController();
    console.log(response);
    console.log(response[0]?.id);
    console.log(isOpen);

    console.log({
        evaluationTrainingReport,
    });


    return (
        <>
            <Container sx={{p: '50px'}}>
                <Stack sx={{textAlign: 'center'}}>
                    <Typography variant="h6" sx={{fontStyle: 'oblique', mb: '10px'}}>
                        Field Traning
                    </Typography>
                </Stack>
                <Divider/>

                {/* Student */}

                <Card sx={{minWidth: 100, mb: '5px'}}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Student Information:
                        </Typography>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Student Name:
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Student Number:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Phone:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                academic specialization:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
                <Divider/>

                {/* Company */}

                <Card sx={{minWidth: 200, mb: '5px'}}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Company Information:
                        </Typography>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Company Name:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Email
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Phone:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Manegar Name{' '}
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Trainer Name{' '}
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
                <Divider/>

                <Card sx={{minWidth: 200, mb: '5px'}}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Student working time{' '}
                        </Typography>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Starting Date :
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Ending Date{' '}
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                The daily working period
                                <Typography variant="h5">
                                    From{bull}nev{bull}To{bull}lent
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                number of absence's Day
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Number of training days for the student
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                Did the student keep working hours?
                                <FormControlLabel control={<Checkbox disabled/>} label="yes"/>
                                <FormControlLabel control={<Checkbox disabled/>} label="No"/>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
                <Divider/>

                <Card sx={{minWidth: 200, mb: '5px'}}>
                    <CardContent>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Student benefit from training:
                        </Typography>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                The main work done by the student during the training
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    ..........
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                The ability of the student to carry out the tasks assigned to
                                him
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            disabled
                                            value="Exelant"
                                            control={<Radio/>}
                                            label="Exelant"
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Very Good"
                                            control={<Radio/>}
                                            label="Very Good "
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Good"
                                            control={<Radio/>}
                                            label="Good"
                                        />
                                        <FormControlLabel
                                            disabled
                                            control={<Radio/>}
                                            label="weak"
                                        />
                                    </RadioGroup>{' '}
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                The student's ability to benefit from the work assigned to him
                                was:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            disabled
                                            value="Exelant"
                                            control={<Radio/>}
                                            label="Exelant"
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Very Good"
                                            control={<Radio/>}
                                            label="Very Good "
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Good"
                                            control={<Radio/>}
                                            label="Good"
                                        />
                                        <FormControlLabel
                                            disabled
                                            control={<Radio/>}
                                            label="weak"
                                        />
                                    </RadioGroup>{' '}
                                </Typography>
                            </Typography>
                        </Stack>

                        <Stack>
                            <Typography sx={{fontWeight: '600'}}>
                                The practical application of the theoretical subjects studied by
                                the student in the college was:
                                <Typography
                                    sx={{mb: 1.5, display: 'inline-block'}}
                                    color="text.secondary"
                                >
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            disabled
                                            value="Exelant"
                                            control={<Radio/>}
                                            label="Exelant"
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Very Good"
                                            control={<Radio/>}
                                            label="Very Good "
                                        />
                                        <FormControlLabel
                                            disabled
                                            value="Good"
                                            control={<Radio/>}
                                            label="Good"
                                        />
                                        <FormControlLabel
                                            disabled
                                            control={<Radio/>}
                                            label="weak"
                                        />
                                    </RadioGroup>{' '}
                                </Typography>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
                <Divider/>
            </Container>
        </>
    );
};
export default EvaluationFormDialog;
