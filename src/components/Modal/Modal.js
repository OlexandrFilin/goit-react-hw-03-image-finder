import Modal from 'react-modal';
import { Overlay, ModalWin } from './Modal.styled.js';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const ModalWindow = props => {
  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Overlay>
        <ModalWin>
          <img
            src={props.image}
            alt={props.tags}
            onClick={props.onCloseModal}
          />
        </ModalWin>
      </Overlay>
    </Modal>
  );
};
