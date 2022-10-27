import React from 'react'
import './index.scss'
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    displayModal: boolean,
    setDisplayModal: (value: any) => void,
}

const AddNewModal: React.FC<ModalProps> = (displayModal, setDisplayModal) => {
    const handleCloseModal = () => setDisplayModal(false)
    return (
        <div className='container-modal'>
            <div className='nav-modal'>
                <button className='nav-modal-close' onClick={handleCloseModal}><CloseIcon /></button>
            </div>
            <div className='left-modal'>
                <div className='left-modal__toolbar'>

                </div>
                <div className='left-modal__content'>

                </div>
            </div>
        </div>
    )
}

export default AddNewModal