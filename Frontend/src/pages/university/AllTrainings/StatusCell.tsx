import React, { FC } from 'react';
import { CellContext } from '@tanstack/react-table';
import { AllTrainingsData } from './api/types';
import { Chip, ChipProps } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatusCellProps extends CellContext<AllTrainingsData, any> {}

const StatusCell: FC<StatusCellProps> = (props) => {
  const mapStatusToColor: Record<string, ChipProps['color']> = {
    completed: 'success',
    rejected: 'error',
    accepted: 'primary',
    running: 'warning',
    canceled: 'error',
    submitted: 'success',
    pending: 'default',
  };

  const {
    row: { original },
  } = props;
  console.log(props.row.original.status);

  return (
    <Chip
      label={original.status}
      color={mapStatusToColor[original.status]}
      size="small"
      variant="filled"
      sx={{ fontSize: '1rem', width: '6rem' }}
    />
  );
};

export default StatusCell;
