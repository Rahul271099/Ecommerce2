import { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Pencil, PencilSquare, Phone, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

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
          {localStorage.getItem("role") == "ADMIN" ? (
            <>
              <Trash />
              <PencilSquare />
            </>
          ) : (
            <Button
              variant="warning"
              style={{ width: "100%" }}
              onClick={() => {
                if (
                  localStorage.getItem("token") &&
                  userContext &&
                  userContext.user &&
                  userContext.user.productsInCart
                ) {
                  userContext.addToCart({
                    id: userContext.user.id,
                    username: userContext.user.username,
                    phone: userContext.user.phone,
                    productsInCart: [
                      ...userContext.user.productsInCart,
                      {
                        id: props.details.id,
                        title: props.details.title,
                        price: props.details.price,
                        description: props.details.description,
                        category: props.details.category,
                        image: props.details.image,
                      },
                    ],
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to cart
            </Button>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
