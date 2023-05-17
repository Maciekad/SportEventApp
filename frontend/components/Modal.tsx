import { buttonClass } from "../model/Constants";

interface ModalProps {
    onCancel: () => void,
    onSubmit: () => void,
    children: JSX.Element
}

const Modal = (props: ModalProps) => {

    let prevent = false;

    const cancelHandler = () => {
        if (prevent) {
            prevent = false;
            return;
        }
            
        props.onCancel();
    };

    const confirmHandler = () => {
        props.onSubmit();
    };

    const preventHandler = () => {
        prevent = true;
    };

    return (
        <div className="backdrop" onClick={cancelHandler}>
            <div className="modal" onClick={preventHandler}>
                <div>
                    {props.children}
                </div>
                <button className={buttonClass} onClick={cancelHandler}>Cancel</button>
                <button className={buttonClass} onClick={confirmHandler}>Confirm</button>
            </div>
        </div>
    );
}

export default Modal;