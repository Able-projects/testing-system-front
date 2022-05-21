import React from 'react'
import { connect } from 'react-redux'


function MyResults(props) {
    const { userInfo } = props.authReducer;

    return (
        <div>MyResults: <b>{userInfo?.score}</b></div>
    )
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
})

export default connect(mapStateToProps, {})(MyResults);