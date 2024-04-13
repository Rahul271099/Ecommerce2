import { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Pencil, PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import CartContext from "./contexts/CartContext";

export default function ProductBuyCard(props) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card.Img
          style={{ width: "8rem", height: "10rem", padding: "0.5rem" }}
          variant="top"
          src={props.details.image}
        />
      </div>
      <Card.Body>
        <Card.Title>{props.details.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Category: {props.details.category}</ListGroup.Item>
        <ListGroup.Item>Price: ${props.details.price}</ListGroup.Item>
        <ListGroup.Item>
          <Button
            variant="warning"
            style={{ width: "100%" }}
            onClick={() => {}}
          >
            Buy now
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            variant="warning"
            style={{ width: "100%" }}
            onClick={() => {
              let prods = cartContext.products.filter((product) => {
                return product.id != props.details.id;
              });
              cartContext.setProducts(prods);
            }}
          >
            Remove from cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
