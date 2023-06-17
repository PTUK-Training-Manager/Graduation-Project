import React, { FC } from 'react';
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import animationData from "src/lotties/infinity-loader.json";

interface BlockUIProps {
    isBlocked?: boolean;
}

const BlockUI: FC<BlockUIProps> = ({isBlocked = true}) => {

  return (
        <Modal
            aria-labelledby="suspense-modal"
            aria-describedby="Waiting for data to load"
            open={isBlocked}
            style={{ zIndex: 1400 }}
            hideBackdrop
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
                {/*<CircularProgress size={50} />*/}
                <Lottie animationData={animationData} style={{width: "100px", height: "100px"}}/>
            </div>
        </Modal>
  );
};

export default BlockUI;
