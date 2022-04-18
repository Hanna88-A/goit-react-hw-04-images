import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
    
    const handleKeyDown = e => {
        console.log('clik')
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
    },[]);

   
    return createPortal(
            <div className={s.overlay} onClick={handleBackdropClick}> 
                <div className={s.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
    );
    
}


// class Modal extends Component {

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }
   
//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             this.props.onClose()
//         }
//     }

//     handleBackdropClick = e => {
//         if (e.currentTarget === e.target) {
//             this.props.onClose()
//         }
//     }
    
//     render() {
//         const {children} = this.props
//         return createPortal(
//             <div className={s.overlay} onClick={this.handleBackdropClick}> 
//                 <div className={s.modal}>
//                     {children}
//                 </div>
//             </div>,
//             modalRoot
//         );
//     };
// };

// export default Modal;