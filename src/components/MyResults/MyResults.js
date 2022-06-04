import * as React from "react";
import { Box, Typography } from "@mui/material";
import { connect } from 'react-redux'


function MyResults(props) {
    const { userInfo } = props.authReducer;
    console.log(userInfo, '---------')
    return (
        <Box my={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: '3rem' }}>
                {userInfo.name && <Typography variant="h3" mr={3}>{userInfo.name}</Typography>}
                {userInfo.email && <Typography variant="p">{userInfo.email}</Typography>}
            </Box>

            <Typography variant="h4" component='span'>MyResults: </Typography>
            <Typography variant="h4" component='span' fontWeight='bold'>{userInfo?.score}</Typography>
        </Box>

    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
})

export default connect(mapStateToProps, {})(MyResults);