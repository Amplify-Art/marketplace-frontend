import * as types from '../../Constants/actions/Global';
import { store } from 'react-notifications-component'
/* eslint-disable no-case-declarations */

const initialState = {
  loading_overlay: false,
  isErrorPage: false,
  mobileMenu: false,
  showPurchaseModal: false,
  showWallet: false,
  showSendModal: false,
  wallet: null,
  showMintSuccessModal: false,
  nearPrice: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
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
    case types.SHOW_SEND_MODAL:
      return {
        ...state,
        showSendModal: true
      }
    case types.HIDE_SEND_MODAL:
      return {
        ...state,
        showSendModal: false
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
    case types.SHOW_MINT_SUCCESS_MODAL:
      return {
        ...state,
        showMintSuccessModal: true
      }
    case types.HIDE_MINT_SUCCESS_MODAL:
      return {
        ...state,
        showMintSuccessModal: false
      }
    case types.SET_WALLET:
      return {
        ...state,
        wallet: action.payload
      }
    case types.CURRENT_NEAR_PRICE_SUCCESS:
      return {
        ...state,
        nearPrice: action.res.data.USD
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
          title: action.payload.title || "Error",
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
