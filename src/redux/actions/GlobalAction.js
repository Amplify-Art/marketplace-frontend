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
