import {
    FC,
    SyntheticEvent,
  } from 'react';

  import Dialog from '@mui/material/Dialog';

  import IconButton from '@mui/material/IconButton';

  import CloseIcon from '@mui/icons-material/Close';
//   import { Response, Row } from '../types';
  import Transition from 'src/components/Transition';
  import Grid from '@mui/material/Grid';
 
  import '../EvaluRequest.css';
import { Row } from '../../CompletedTrainees/types';

  
  interface QuestionDialog {
    isOpen: boolean;
    currentTab: string;
    trainingId: string;
    handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
    handleCloseDialog: () => void;
    response?: Response; // add ? to allow for undefined values
    data?: Row[];
  }
  
  const QuestionDialog: FC<QuestionDialog> = ({
    isOpen,
    handleCloseDialog,
    trainingId,
    response,
    data,
  }) => {
    // const remainingHours = response
    //   ? parseFloat(response.totalHours) - parseFloat(response.achievedHours)
    //   : 0;
    // const percentage = response
    //   ? (parseFloat(response.achievedHours) / parseFloat(response.totalHours)) *
    //     100.0
    //   : 0;
    // console.log(percentage);
    // const student = data?.find((trainee) => trainee.id === trainingId)?.Student;
    // const studentId = data?.find(
    //   (trainee) => trainee.id === trainingId
    // )?.studentId;
  
    return (
      <Grid sx={{ padding: '2' }}>
        <Dialog
          sx={{ left: '50%' }}
          fullScreen
          open={isOpen}
          onClose={handleCloseDialog}
          TransitionComponent={Transition}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon color="action" />
          </IconButton>
          <>
      
          </>
        </Dialog>
      </Grid>
    );
  };
  
  export default QuestionDialog;
  