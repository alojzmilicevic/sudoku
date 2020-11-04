import { HIDE_MODAL, SHOW_MODAL } from '../actions/modal';

function modal(state = null, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };

    case HIDE_MODAL:
      return { ...state, modalProps: {}, modalType: null };

    default:
      return state;
  }
}

export const getModalType = state => state.modalType;
export const getModalProps = state => state.modalProps;

export default modal;
