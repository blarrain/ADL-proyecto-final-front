import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardArticulo from './components/CardArticulo.JSX';

function App() {
	return (
		<>
			<Container>
				<Row>
					<Col xs={12} sm={8} md={4} lg={3}>
						<CardArticulo />
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default App;
