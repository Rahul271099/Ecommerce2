let user = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

let getUser = async (req, resp) => {
  try {
    resp.status(200).send(await user.findOne({ id: req.params.id }));
  } catch (error) {
    console.log(error);
    resp.status(500).send("Something went wrong!");
  }
};

let saveUser = async (req, resp) => {
  let dbUser = await userModel.findOne({ id: req.body.id });

  if (dbUser) {
    resp.status(501).send("User already exist with his email id");
  } else {
    let userDetails = req.body;
    let userPassword = await bcrypt.hash(userDetails.password, 10);
    try {
      await user.create({
        id: userDetails.id,
        username: userDetails.username,
        phone: userDetails.phone,
        password: userPassword,
        role: userDetails.role,
        productsInCart: userDetails.productsInCart,
        products: userDetails.products,
      });
      resp.status(201).send("User created");
    } catch (error) {
      console.log(error);
      resp.status(500).send("Something went wrong!");
    }
  }
};

let updateUser = async (req, resp) => {
  let uId = req.params.id;
  let dbUser = await userModel.findOne({ id: uId });
  let userUpdateDto = req.body;
  console.log("body: ", userUpdateDto);
  if (dbUser) {
    try {
      await userModel.updateOne({ id: uId }, { $set: userUpdateDto });
      console.log("User details updated");
      resp.status(200).send(await userModel.findOne({ id: uId }));
    } catch (error) {
      console.log("error");
      resp.status(500).send("Something went wrong");
    }
  } else {
    resp.status(404).send("User not found");
  }
};

let login = async (req, resp) => {
  let userDetails = req.body;
  let dbUser = await user.findOne({ id: userDetails.id });
  if (dbUser) {
    try {
      let isPasswordEqual = await bcrypt.compare(
        userDetails.password,
        dbUser.password
      );
      if (isPasswordEqual) {
        // JWT Token generation
        let token = jwt.sign(
          { username: dbUser.username, role: dbUser.role },
          "NodeJsRestApi",
          {
            expiresIn: "5h",
          }
        );
        resp.status(201).send({
          id: dbUser.id,
          username: dbUser.username,
          phone: dbUser.phone,
          productsInCart: dbUser.productsInCart,
          products: dbUser.products,
          token: token,
          role: dbUser.role,
        });
      } else {
        resp.status(401).send("User not authenticated");
      }
    } catch (error) {
      resp.status(500).send("Something went wrong!");
    }
  } else {
    resp.status(404).send("User not found!");
  }
};

let verifyAdminToken = (req, resp, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  } else {
    resp.status(401).send("Please provide access token");
  }

  try {
    let jwtDetails = jwt.verify(token, "NodeJsRestApi");
    if (jwtDetails && jwtDetails.role == "ADMIN") {
      next();
    } else {
      resp.status(401).send("User not authenticated!");
    }
  } catch (error) {
    console.log(error);
    resp.status(401).send("User not authenticated!");
  }
};

let verifyUserToken = (req, resp, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  } else {
    resp.status(401).send("Please provide access token");
  }

  try {
    let jwtDetails = jwt.verify(token, "NodeJsRestApi");
    if (jwtDetails && jwtDetails.role == "USER") {
      next();
    } else {
      resp.status(401).send("User not authenticated!");
    }
  } catch (error) {
    resp.status(401).send("User not authenticated!");
  }
};

let verifyAdminOrUserToken = (req, resp, next) => {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1];
  } else {
    resp.status(401).send("Please provide access token");
  }

  try {
    let jwtDetails = jwt.verify(token, "NodeJsRestApi");

    if (
      jwtDetails &&
      (jwtDetails.role == "USER" || jwtDetails.role == "ADMIN")
    ) {
      next();
    } else {
      resp.status(401).send("User not authenticated!");
    }
  } catch (error) {
    resp.status(401).send("User not authenticated!");
  }
};

module.exports = {
  getUser,
  saveUser,
  login,
  updateUser,
  verifyAdminToken,
  verifyUserToken,
  verifyAdminOrUserToken,
};
