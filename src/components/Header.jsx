import Container from 'react-bootstrap/Container';

const Header = ({
  h1Text = "🌿 Vivero JRB",
  pText = "Plantas, árboles y flores cultivadas con amor para dar vida a tus espacios."
}) => {
  return (
    <header className="hero-vivero">
      <Container className="text-center text-light py-5">
        <h1 className="display-3 fw-bold">{h1Text}</h1>
        <p className='fw-light fs-3 text-opacity-90 my-4'>
          {pText}
        </p>
        <hr className='mx-auto' />
      </Container>
    </header>
  );

}


export default Header;