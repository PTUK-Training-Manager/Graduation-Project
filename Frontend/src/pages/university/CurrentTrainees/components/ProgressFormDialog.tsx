import React, {FC, SyntheticEvent} from 'react';
import Accordion from "@mui/material/Accordion";
import Dialog from "@mui/material/Dialog";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Transition from "src/components/Transition";

interface ProgressFormDialogProps {
    isOpen: boolean;
    currentTab: string;
    handleChangeTab: (event: SyntheticEvent, newValue: string) => void;
    handleCloseDialog: () => void;
}

const ProgressFormDialog: FC<ProgressFormDialogProps> = ({
                                                             isOpen,
                                                             currentTab,
                                                             handleChangeTab,
                                                             handleCloseDialog,
                                                         }) => {

    return (
        <Dialog
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
                        <Tabs
                            value={currentTab}
                            onChange={handleChangeTab}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="one" label="Item One"


                            />
                            <Tab value="two" label="Note"/>

                        </Tabs>
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