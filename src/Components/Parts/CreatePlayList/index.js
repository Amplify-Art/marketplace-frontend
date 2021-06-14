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
            <form className="playlist-wrapper">
                <div>
                    <div className="input-holder">
                        <input name="playlist-name" type="text" placeholder="Playlist Name" {...register("playlistName", { required: true })} />
                    </div>
                    <AddShowCase showCaseData={showCaseData}/>
                </div>
                <div>
                    <div className="case-wrapper">
                        <img src={CDImg} alt="" />
                    </div>
                    {renderPlayList()}
                </div>
            </form>
            <button>Create PlayList</button>
        </div>
    )
};

export default CreatePlayList;