import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddProduct() {
  const id = useRef();
  const title = useRef();
  const desc = useRef();
  const price = useRef();
  const category = useRef();
  const quantity = useRef();
  const image = useRef();

  async function addProduct() {
    try {
        let response = await axios.post(
            "http://localhost:9000/products",
            {
              id: id.current.value,
              title: title.current.value,
              description: desc.current.value,
              category: category.current.value,
              price: price.current.value,
              image: image.current.value,
              quantity: quantity.current.value,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if(response.status==201) {
            toast.success("Product added successfuly");
          }
    } catch(error) {
        console.log(error);
        toast("Something went wrong")
    }

    
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Add product</h1>

        <Card style={{ padding: "1rem", width: "80%" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control
                ref={id}
                type="number"
                placeholder="Enter product id"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={title}
                type="text"
                placeholder="Enter product title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                ref={price}
                type="number"
                placeholder="Enter product price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                ref={desc}
                as="textarea"
                rows={3}
                type="text"
                placeholder="Enter product description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                ref={category}
                type="text"
                placeholder="Enter product category"
              >
                <option value="Footwear">Footwear</option>
                <option value="Shirt">Shirt</option>
                <option value="T Shirt">T Shirt</option>
                <option value="Watches">Watches</option>
                <option value="Jewellery">Jewellery</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image url</Form.Label>
              <Form.Control
                ref={image}
                type="text"
                placeholder="Enter image url"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                ref={quantity}
                type="number"
                placeholder="Enter product quantity"
              />
            </Form.Group>

            <Button
              style={{ width: "100%" }}
              variant="warning"
              type="submit"
              onClick={(event) => {
                event.preventDefault();

                if (
                  id.current.value &&
                  title.current.value &&
                  desc.current.value &&
                  category.current.value &&
                  price.current.value &&
                  image.current.value &&
                  quantity.current.value
                ) {
                    addProduct();
                } else {
                  toast("Details are invalid");
                }
              }}
            >
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
