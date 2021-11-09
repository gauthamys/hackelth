import Modal from 'react-modal';
import { useState } from 'react';
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  
function Intro() {
    const [modalIsOpen, setIsOpen] = useState(true);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (

        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className='absolute center border-4 border-blue-700 rounded-2xl my-2 mx-48 w-3/4 h-3/4 bg-blue-800 text-white opacity-95'
            >
                <div className='text-center p-8'>
                    <div className='text-3xl'>Prognostic Monitoring and Analysis of Healthscores</div>
                    <div>I am a modal</div>
                </div>
            </Modal>
        </div>
    );
}

export default Intro;