import React from 'react';

const SingleArticuloRow = ({ id_articulo, nombre }) => {
	return <div>{id_articulo} - {nombre}</div>;
};

export default SingleArticuloRow;
