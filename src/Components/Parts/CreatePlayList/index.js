import React from 'react';
import { useForm } from "react-hook-form";
import AddShowCase from '../AddShowCase';

import CDImg from '../../../assets/images/cd-img.svg';

import './CreatePlayList.scss';

function CreatePlayList({showCaseData}) {
    const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm();
    const playlistData = [
        {title: "What is Love"},
        {title: "What is Love"},
        {title: "What is Love"},
        {title: "What is Love"}
    ];

    const renderPlayList = () => {
        return playlistData.map((list,index) => (
            <div>{`${index+1}. ${list.title}`}</div>
        ))
    }

    return(
        <div id="create-playlist">
            <form>
                <div className="playlist-wrapper">
                    <div className="playlist-showcase">
                        <div className="input-holder">
                            <input name="playlist-name" type="text" placeholder="Playlist Name" {...register("playlistName", { required: true })} />
                        </div>
                        <AddShowCase showCaseData={showCaseData}/>
                    </div>
                <div className="playlist-CD">
                    <div className="case-wrapper">
                        <img src={CDImg} alt="" />
                        
                    </div>
                    <ul>
                        {renderPlayList()}
                    </ul>
                    
                </div>
                </div>
                <div className="btn-wrap">
                    <button>Create PlayList</button>
                </div>
            </form>
    </div>
    )
};

export default CreatePlayList;