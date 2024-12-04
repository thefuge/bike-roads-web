import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

export default function SpinnerUI() {
  return (
    <Row
      style={{
        height: "100vh",
      }}
      className="justify-content-center align-items-center"
    >
      <Spinner animation="grow" variant="dark" />
    </Row>
  );
}
