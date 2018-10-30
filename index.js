/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const axios = require("axios");

exports.klaviyo = (req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  let key = req.query.key || req.body.key;
  let email = req.query.email || req.body.email;
  let variant = req.query.variant || req.body.variant;

  let data =
    "a=" +
    key +
    "&email=" +
    email +
    "&variant=" +
    variant +
    "&platform=shopify";

  axios
    .post("https://a.klaviyo.com/api/v1/catalog/subscribe", data)
    .then(function(response) {
      console.log(response);
      res.status(200).send(response.data);
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).send({ message: "API Failed" });
    });
};
