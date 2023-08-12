import React from "react";
import Skeleton from "react-loading-skeleton";
import '../styles/Component.scss';
import { Grid } from '@mui/material';
const CardSkeleton = () => {
    return (
        <Grid className="skeleton--card-arr">
            {Array(18)
                .fill()
                .map((item, index) => (
                    <Grid className="skeleton--card skeleton--card-channel" key={index}>
                        <Skeleton />
                    </Grid>
                ))}
        </Grid>
    );
};
export default CardSkeleton;
