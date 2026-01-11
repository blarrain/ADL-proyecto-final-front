import Form from 'react-bootstrap/Form';

function InputForm({ id = '0', type = 'text', name = 'Ingrese', ...props }) {
    return (
        <>
            <Form.Group className="mb-3">

                <Form.Label htmlFor={id}>{name}</Form.Label>
                <Form.Control
                    type={type}
                    id={id}
                    placeholder={`Ingrese ${name}`}
                    {...props}
                />
            </Form.Group>

        </>
    );
}

export default InputForm;