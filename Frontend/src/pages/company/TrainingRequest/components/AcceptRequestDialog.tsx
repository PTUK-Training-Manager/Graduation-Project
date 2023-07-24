/* eslint-disable react/react-in-jsx-scope */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptRequestDialog {
  acceptRequestDialogOpen: boolean;
  handleCancelAcceptRequest: () => void;
  handleAcceptRequest: () => void;
}

const AcceptRequestDialog: FC<AcceptRequestDialog> = ({
  acceptRequestDialogOpen,
  handleCancelAcceptRequest,
  handleAcceptRequest,
}) => {
  //@ts-ignore
  const { t } = useTranslation();

  return (
    <Dialog
      open={acceptRequestDialogOpen}
      onClose={handleCancelAcceptRequest}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{t("AcceptRequest")}</DialogTitle>
      <DialogContent>{t("Are you sure you want to accept this training Request?")}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancelAcceptRequest} color="error">
          {t("Cancel")}
        </Button>
        <Button onClick={handleAcceptRequest} color="success" variant="contained">
          {t("Accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AcceptRequestDialog;
