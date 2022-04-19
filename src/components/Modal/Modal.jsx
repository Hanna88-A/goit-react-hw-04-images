import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from "prop-types"; 

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
    console.log(children)
    
    const handleKeyDown = e => {
        
        if (e.code === 'Escape') {
            onClose()
        }
    }
    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }

    useEffect(() => { window.addEventListener('keydown', handleKeyDown) 
        return () => {
        window.removeEventListener('keydown', handleKeyDown)
    }
    });

   
    return createPortal(
            <div className={s.overlay} onClick={handleBackdropClick}> 
                <div className={s.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
    );
    
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element
   
};

