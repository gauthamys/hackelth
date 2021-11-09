import Modal from 'react-modal';
import { useState } from 'react';
import Logo from '../model.jpg'
  
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
                className='absolute center border-4 border-blue-700 rounded-2xl my-2 mx-48 w-3/4 h-3/4 bg-blue-800 text-white opacity-95 py-5'
            >
                <div className='text-center p-8'>
                    <div className='text-4xl'>Prognostic Monitoring and Analysis of Healthscores</div>
                    <div class="text-2xl py-5"><br/>To identify the health of parts which can be used for prognostics analytics in many use cases like upgrades, 
                    e-commerce at different stages of an invisible</div>
                    <div class="grid place-items-center">
                        <img src={Logo} alt="Logo"/>
                    </div>
                    
                </div>
            </Modal>
        </div>
    );
}

export default Intro;