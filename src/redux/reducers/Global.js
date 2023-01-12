import { toast } from 'react-toastify';
import * as types from '../../Constants/actions/Global';
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
  showPlayer: false,
  isPlaying: false,
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
    case types.TOGGLE_PLAYER_REQUEST:
      return {
        ...state,
        showPlayer: !state.showPlayer
      }
    case types.TOGGLE_PLAYING_REQUEST:
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    case types.SET_NOTIFICATION:
      if (action.payload.success) {
        toast.success(action.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }); 
      } else {
        toast.error(action.payload.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }); 
      }
      return state;
    default:
      return state;
  }
}
