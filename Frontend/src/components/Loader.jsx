import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div style={{height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>

    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>

    </div>
  );
}

export default Loader;