import React,{ useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import './AddShowCase.scss';

function AddShowCase({ showCaseData }) {
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    },[]);

    return (
        <div id="addshowcase" >
            <div class="scrollbar" id="style-4">
                {showCaseData && showCaseData.length > 0 && showCaseData.map((showcase, item) => (
                    <div className="row">
                        {!loading ? <img src={showcase.image} alt="" /> : <Skeleton width={60} height={60}/>}
                        <div className="row-wrap">
                            <div className="row-title">{showcase.title}</div>
                            <div className="row-desc">{showcase.description}</div>
                        </div>
                        <button className="add-btn">Add</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AddShowCase;