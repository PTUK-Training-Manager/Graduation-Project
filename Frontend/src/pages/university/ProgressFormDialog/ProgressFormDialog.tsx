import React, {FC} from 'react';
import {useTraineesContext} from "../context/TraineesContext";
import Dialog from "@mui/material/Dialog";
import Transition from "src/components/Transition";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {TrainingDialog} from "../constants";

const ProgressFormDialog: FC = () => {

    const {openDialog, onCloseDialog} = useTraineesContext();

    return (
        <Dialog
            fullScreen
            open={openDialog === TrainingDialog.Progress}
            onClose={onCloseDialog}
            TransitionComponent={Transition}
        >
            <IconButton
                edge="start"
                color="inherit"
                onClick={onCloseDialog}
                aria-label="close"
            >
                <CloseIcon/>
            </IconButton>
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>WEEK 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/*<Tabs*/}
                        {/*    value={currentTab}*/}
                        {/*    onChange={handleChangeTab}*/}
                        {/*    textColor="secondary"*/}
                        {/*    indicatorColor="secondary"*/}
                        {/*    aria-label="secondary tabs example"*/}
                        {/*>*/}
                        {/*    <Tab value="one" label="Item One"*/}


                        {/*    />*/}
                        {/*    <Tab value="two" label="Note"/>*/}

                        {/*</Tabs>*/}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Accordion 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
        </Dialog>
    );
};

export default ProgressFormDialog;
