import React, { FC } from 'react';
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

interface BlockUIProps {
    isBlocked: boolean;
}

const BlockUI: FC<BlockUIProps> = ({isBlocked}) => {

  return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isBlocked}
            style={{ zIndex: 1400 }}
        >
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress size={50} />
            </div>
        </Modal>
  );
};

export default BlockUI;
