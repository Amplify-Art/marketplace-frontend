import React,{ useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useForm } from "react-hook-form";
import AddShowCase from '../AddShowCase';

import CDImg from '../../../assets/images/cd-img.svg';

import './CreatePlayList.scss';

function CreatePlayList({ showCaseData }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    },[]);

    const playlistData = [
        { title: "What is Love" },
        { title: "What is Love" },
        { title: "What is Love" },
        { title: "What is Love" }
    ];

    const renderPlayList = () => {
        return playlistData.map((list, index) => (
            <div>{`${index + 1}. ${list.title}`}</div>
        ))
    }

    const onSubmit = (data) => alert(JSON.stringify(data));

    return (
        <div id="create-playlist">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="playlist-wrapper">
                    <div className="playlist-showcase">
                        <div className="input-holder">
                            <input name="playlist-name" type="text" placeholder="Playlist Name" {...register("playlistName", { required: true })} />
                        </div>
                        <AddShowCase showCaseData={showCaseData} />
                    </div>
                    <div className="playlist-CD">
                        {!loading ? 
                            <div className="case-box case-wrapper">
                                <img src={CDImg} alt="" />
                            </div>
                        : <Skeleton width={250} height={214} className="case-box"/>}
                        <ul>
                            {renderPlayList()}
                        </ul>
                    </div>
                </div>
                <div className="btn-wrabtn-wrapp input-holder">
                    <input type="submit" value="Create PlayList" />
                </div>
            </form>
        </div>
    )
};

export default CreatePlayList;