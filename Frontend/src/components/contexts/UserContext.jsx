import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState();

  async function getUser(id, token) {
    try {
      let response = await axios.get("http://localhost:9000/user/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);

  async function addToCart(payload) {
    try {
      let response = await axios.put(
        "http://localhost:9000/user/update/" + localStorage.getItem("id"),
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      getUser(localStorage.getItem("id"), localStorage.getItem("token"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, addToCart }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
