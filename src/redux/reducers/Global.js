import * as types from '../../Constants/actions/Global';
import { store } from 'react-notifications-component'
/* eslint-disable no-case-declarations */

const initialState = {
  loading_overlay: false,
  isErrorPage: false,
  mobileMenu: false,
  showPurchaseModal: false,
  showWallet: false,
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
    case types.SET_IS_ERROR_PAGE:
      return {
        ...state,
        isErrorPage: true
      };
    case types.UNSET_IS_ERROR_PAGE:
      return {
        ...state,
        isErrorPage: false
      }
    case types.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenu: !state.mobileMenu
      }
    case types.SHOW_PURCHASE_MODAL:
      return {
        ...state,
        showPurchaseModal: true
      }
    case types.HIDE_PURCHASE_MODAL:
      return {
        ...state,
        showPurchaseModal: false
      }
    case types.SHOW_WALLET:
      return {
        ...state,
        showWallet: true
      }
    case types.HIDE_WALLET:
      return {
        ...state,
        showWallet: false
      }
    case types.SET_NOTIFICATION:
      if (action.payload.success) {
        store.addNotification({
          title: "Success",
          message: action.payload.message,
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      } else {
        store.addNotification({
          title: "Error",
          message: action.payload.message,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
      return state;
    default:
      return state;
  }
}
