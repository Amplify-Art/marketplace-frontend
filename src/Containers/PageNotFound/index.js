import React,{useEffect} from 'react';
import './PageNotFound.scss';

function PageNotFound() {
    useEffect(() => {
        document.body.style.backgroundColor = '#4a4a4a'
    },[])
    return(
        <div id="error-page" className="error-page">
            <div className="title">404</div>
        </div>
    )
}

export default PageNotFound;