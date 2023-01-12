import * as types from '../../Constants/actions/Global';

export const displayLoadingOverlayAction = () => ({
  type: types.SET_OVERLAY_LOADER,
});

export const toggleMobileMenuAction = () => ({
  type: types.TOGGLE_MOBILE_MENU,
})

export const hideLoadingOverlayAction = () => ({
  type: types.UNSET_OVERLAY_LOADER,
});

export const setIsErrorPage = () => ({
  type: types.SET_IS_ERROR_PAGE
})

export const unsetIsErrorPage = () => ({
  type: types.UNSET_IS_ERROR_PAGE
})

export const showPurchaseModalAction = () => ({
  type: types.SHOW_PURCHASE_MODAL
});

export const hidePurchaseModalAction = () => ({
  type: types.HIDE_PURCHASE_MODAL
})

export const showWalletAction = () => ({
  type: types.SHOW_WALLET
});

export const hideWalletAction = () => ({
  type: types.HIDE_WALLET
})

export const sendNearAction = (payload) => ({
  type: types.SEND_NEAR_REQUEST,
  payload
})

export const showSendModalAction = () => ({
  type: types.SHOW_SEND_MODAL
});

export const hideSendModalAction = () => ({
  type: types.HIDE_SEND_MODAL
});

export const setWalletAction = (payload) => ({
  type: types.SET_WALLET,
  payload
});

export const showMintSuccessModalAction = () => ({
  type: types.SHOW_MINT_SUCCESS_MODAL
});

export const hideMintSuccessModalAction = () => ({
  type: types.HIDE_MINT_SUCCESS_MODAL
});

export const sendNotificationAction = ({ success, message }) => ({
  type: types.SET_NOTIFICATION,
  payload: { success, message },
});

export const setCurrentNearPrice = () => ({
  type: types.CURRENT_NEAR_PRICE_REQUEST,
});

export const togglePlayerAction = () => ({
  type: types.TOGGLE_PLAYER_REQUEST,
});

export const togglePlayingAction = () => ({
  type: types.TOGGLE_PLAYING_REQUEST,
});
