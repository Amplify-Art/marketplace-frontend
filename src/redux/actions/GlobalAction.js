import * as types from '../../Constants/actions/Global';

export const displayLoadingOverlayAction = () => ({
    type: types.SET_OVERLAY_LOADER,
});

export const hideLoadingOverlayAction = () => ({
    type: types.UNSET_OVERLAY_LOADER,
});
