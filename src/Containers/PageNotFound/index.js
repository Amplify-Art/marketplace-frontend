import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as globalActions from '../../redux/actions/GlobalAction'
import './PageNotFound.scss';

function PageNotFound(props) {
    useEffect(() => {
        props.setIsErrorPage()
    },[])

    useEffect(()=>{
        return()=>{
            props.unsetIsErrorPage()
        }
    },[])
    return(
        <div id="error-page" className="error-page">
            <div className="title" >404</div>
        </div>
    )
}

export default connect(null,
    dispatch => {
      return {
        setIsErrorPage: () => dispatch(globalActions.setIsErrorPage()),
        unsetIsErrorPage: () => dispatch(globalActions.unsetIsErrorPage())
      }
    })(withRouter(PageNotFound));