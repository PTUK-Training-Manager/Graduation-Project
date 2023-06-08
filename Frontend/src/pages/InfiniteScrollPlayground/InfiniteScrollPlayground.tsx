import React, {FC} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface InfiniteScrollPlaygroundProps {
}

const InfiniteScrollPlayground: FC<InfiniteScrollPlaygroundProps> = (props) => {

    const [dataSource, setDataSource] = React.useState<any[]>(
        Array.from({length: 5})
    );
    const [hasMore, setHasMore] = React.useState<boolean>(true);


    const fetchMoreData = () => {
        if (dataSource.length >= 100) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setDataSource((prev) => [
                ...prev,
                ...Array.from({length: 5}),
            ]);
        }, 1000);
    }

    return (
        <Stack sx={{
            p: 3,
            gap: 1
        }}>
            <Typography variant="h4" component="h1">
                Infinite Scroll
            </Typography>
            <Grid
                container
                sx={{
                    height: `calc(100vh - 42px - 48px - 8px)`,
                    // height: "400px",
                    overflow: "auto",
                    bgcolor: "antiquewhite",
                    justifyContent: "center"
                }}
                id="scrollableDiv"
            >
                <InfiniteScroll
                    scrollableTarget="scrollableDiv"
                    dataLength={dataSource.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={<p>Yay! You have seen it all</p>}
                    // height={500}
                >
                    {dataSource.map((item, index) => {
                        return (
                            <Paper
                                key={index}
                                variant="outlined"
                                sx={{
                                    margin: "12px auto",
                                    padding: "50px",
                                }}
                            >
                                This is a dev #{index + 1} inside InfiniteScroll
                            </Paper>
                        );
                    })}
                </InfiniteScroll>
            </Grid>
        </Stack>
    );
};

export default InfiniteScrollPlayground;
