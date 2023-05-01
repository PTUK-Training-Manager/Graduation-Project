import React, { forwardRef, Ref, ReactElement } from 'react';
import Slide from "@mui/material/Slide";
import {TransitionProps as MuiTransitionProps} from '@mui/material/transitions';

interface TransitionProps extends MuiTransitionProps {
    children: ReactElement;
}

const Transition = forwardRef<Ref<HTMLElement>, TransitionProps>((props, ref) => {

    return (
        <Slide
            direction="left"
            ref={ref}
            {...props}
            timeout={700}
        />
    );
});

export default Transition;
