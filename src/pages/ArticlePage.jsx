import Container from 'react-bootstrap/Container';
import AllArticulosStack from '../components/AllArticulosStack';
import ArticleForm from '../components/ArticleForm';
import { useState } from 'react';

const ArticlePage = () => {
const [articuloID, setArticuloID] = useState(null)
const handleEdit = (id) => {setArticuloID(id)}
const handleReset = () => {setArticuloID(null)}

	return (
		<div>
			<Container className='my-5'>
                <ArticleForm id={articuloID} onReset={handleReset} />
				<AllArticulosStack onEdit={handleEdit} />
			</Container>
		</div>
	);
};

export default ArticlePage;
