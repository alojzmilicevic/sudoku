import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import SettingsModal from './SettingsModal';
import { getModalProps, getModalType } from '../../reducers/modal';
import { hideModal } from '../../actions/modal';
import HowToModal from './HowToModal';
import CompletedModal from './CompletedModal';

export const ModalTypes = {
  SETTINGS: 0,
  HOW_TO_PLAY: 1,
  COMPLETED_GAME: 2,
};

const ModalComponents = {
  [ModalTypes.SETTINGS]: SettingsModal,
  [ModalTypes.HOW_TO_PLAY]: HowToModal,
  [ModalTypes.COMPLETED_GAME]: CompletedModal,
};

const useStyles = makeStyles({
  overlay: {
    display: 'flex',
    padding: 50,
    backgroundColor: 'white',
    minWidth: 350,
    maxWidth: 450,
    border: '1px solid #e6e6e6',
    boxShadow: '0 4px 23px 0 rgba(0,0,0,0.08)',
    outline: 0,
  },
});

function ModalRoot(props) {
  const { modalType, modalProps, closeModal } = props;
  const classes = useStyles();

  if (modalType === null) {
    return null;
  }

  const SpecificModal = ModalComponents[modalType];

  return (
    <Modal
      ariaHideApp={false}
      isOpen
      onRequestClose={closeModal}
      className={classes.overlay}
    >
      <SpecificModal {...modalProps} />
    </Modal>
  );
}

ModalRoot.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.number,
  modalProps: PropTypes.objectOf(PropTypes.any),
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
});

const mapStateToProps = state => ({
  modalType: getModalType(state),
  modalProps: getModalProps(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
