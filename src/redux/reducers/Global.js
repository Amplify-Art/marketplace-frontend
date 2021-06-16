import * as types from '../../Constants/actions/Global';

/* eslint-disable no-case-declarations */

const initialState = {
    loading_overlay: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_OVERLAY_LOADER:
            return {
                ...state,
                loading_overlay: true,
            };
        case types.UNSET_OVERLAY_LOADER:
            return {
                ...state,
                loading_overlay: false,
            };
        default:
            return state;
    }
}