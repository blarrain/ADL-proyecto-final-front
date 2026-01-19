import Alert from 'react-bootstrap/Alert';
import { CartContext } from "../context/CartContext";
import { useContext } from 'react';

function Notificacion({ variant = 'success', mensaje = 'text' }) {
    const { setShow } = useContext(CartContext);
    return (
        <>
            <div className="fixed-bottom end-0 p-3"
                style={{ zIndex: 1050, display: 'flex', justifyContent: 'flex-end' }}>
                <Alert
                    key={variant}
                    variant={variant}
                    onClose={() => setShow(false)}
                    dismissible
                    className="shadow"
                    style={{ width: 'auto', minWidth: '300px' }}
                >

                    <Alert.Heading>{mensaje}</Alert.Heading>
                </Alert>

            </div>
        </>
    );
}

export default Notificacion;