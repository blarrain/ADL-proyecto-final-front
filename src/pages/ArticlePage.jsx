import Container from 'react-bootstrap/Container';
import AllArticulosStack from '../components/AllArticulosStack';
import ArticleForm from '../components/ArticleForm';

const ArticlePage = () => {
	return (
		<div>
			<Container className='my-5'>
                <ArticleForm />
				<AllArticulosStack />
			</Container>
		</div>
	);
};

export default ArticlePage;
