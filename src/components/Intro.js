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
                className='rounded-2xl mt-3 mx-48 w-3/4 bg-gray-800 bg-cover text-white py-5'
            >
                <div className='text-center p-8'>
                    <button onClick={closeModal} className='fixed top-8 right-24 clickable rounded-full w-8 h-8 bg-red-600 bg-opacity-80'>
                        <span className='p-2'>X</span>
                    </button>
                    <div className='text-3xl font-bold text-green-200'>Prognostic Monitoring and Analysis of Healthscores</div>
                    <div class="text-xl text-blue-200 p-5 font-semibold"><br/>To identify the health of parts which can be used for prognostics analytics in many use cases like upgrades,     
                    e-commerce at different stages of an invisible</div>
                    <div class="grid place-items-center">
                        <img src={Logo} alt="Logo" className='rounded-xl shadow-xl my-5 w-11/12'/>
                    </div>
                    <div className="text-2xl py-5">Health score estimated using Decision Tree Regression.</div>
                </div>
            </Modal>
        </div>
    );
}

export default Intro;