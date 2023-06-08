import React, {FC} from "react";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

interface TableBodySkeletonProps {
    skeletonRowCount?: number;
    skeletonRowHeight?: number;
    columnCount: number;
}

const TableBodySkeleton: FC<TableBodySkeletonProps> = ({
                                                           skeletonRowCount = 10,
                                                           skeletonRowHeight = 28 ,
                                                           columnCount,
                                                       }) => {

    const rows = Array.from({length: skeletonRowCount}, (x, i) => i);
    const columns = Array.from({length: columnCount}, (x, i) => i);

    return (
        <>
            {rows.map((skeleton) => (
                <TableRow key={skeleton}>
                    {columns.map(
                        (elm) => (
                            <TableCell key={elm}>
                                <Skeleton height={skeletonRowHeight}/>
                            </TableCell>
                        )
                    )}
                </TableRow>
            ))}
        </>
    );
};

export default TableBodySkeleton;
