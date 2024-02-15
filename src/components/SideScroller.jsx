import { Box, IconButton, Typography } from '@mui/material';
import { ArrowForwardIos, ArrowBackIosNew } from '@mui/icons-material/';
import { useRef } from 'react';

const SideScroller = ({ Component, Title }) => {
    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const { current: element } = scrollRef;
            const scrollAmount = direction === 'left' ? -element.offsetWidth / 2 : element.offsetWidth / 2;
            element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                width: '100%',
                maxWidth: 700,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontSize: 'clamp(20px, 2vw, 5vw)',
                    fontWeight: 900,
                    ml: 5,
                    mb: 1,
                    color: (theme) => theme.palette.secondary.main,
                }}
            >
                {Title}
            </Typography>
            <Box
                display="flex"
                alignItems="center"
                width="100%"
            >
                <IconButton
                    onClick={() => handleScroll('left')}
                    sx={{
                        color: (theme) => theme.palette.warning.main,
                        '& svg': { fontSize: '3rem' }
                    }}
                >
                    <ArrowBackIosNew fontSize='large' />
                </IconButton>
                <Box
                    ref={scrollRef}
                    display="flex"
                    flexDirection="row"
                    overflow="auto"
                    borderRadius={2}
                    mb={3}
                    p={1}
                    gap={1}
                    sx={{
                        flex: 1,
                        height: '30vh',
                        maxHeight: 165,
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        '&': {
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        },

                    }}
                >
                    <Component />
                </Box>
                <IconButton
                    onClick={() => handleScroll('right')}
                    sx={{
                        color: (theme) => theme.palette.warning.main,
                        '& svg': { fontSize: '3rem' }
                    }}
                >
                    <ArrowForwardIos fontSize='large' />
                </IconButton>
            </Box>
        </Box>
    );
};

export default SideScroller;
