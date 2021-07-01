import React,{useEffect} from 'react';
import './PageNotFound.scss';

function PageNotFound(props) {
    useEffect(() => {
        document.body.style.backgroundColor = '#4a4a4a'
    },[])
    return(
        <div id="error-page" className="error-page">
            <div className={props.text ? "text-title" : "title"}>{props.text || 404}</div>
        </div>
    )
}

export default PageNotFound;