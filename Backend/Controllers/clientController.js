const Clients = require("../Models/ClientModel");
const ClientValidator = require("../Validators/ClientValidator");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");

let getAllClients = async (request, response) => {
  let allClients = await Clients.find({});
  return response.status(200).json({ data: allClients });
};

let getClient = async (request, response) => {
  let ID = request.params.id;
  if (!isValidObjectId(ID)) {
    return response.status(400).json({ message: "Invalid Client ID!" });
  }
  let client = await Clients.findById(ID);
  if (client == undefined) {
    return response.status(404).json({ message: "Client not found!" });
  }
  return response.status(200).json({ data: client });
};

let createClient = async (request, response) => {
  let client = request.body;

  if (await Clients.findOne({ email: client.email })) {
    return response.json({ message: "Mail already exists!" });
  }
  if (await Clients.findOne({ userName: client.userName })) {
    return response.json({ message: "user name already exists!" });
  }
  if (ClientValidator(client)) {
    client.password = await bcrypt.hash(client.password, 10);

    await Clients.create(client);
    return response
      .status(201)
      .json({ message: "Client added", data: { client } });
  } else {
    response.json({
      message:
        ClientValidator.errors[0].instancePath.substring(1) +
        " " +
        ClientValidator.errors[0].message,
    });
  }
};

let searchFreelancers = async (request, response) => {
  const query = request.query.query;
  console.log(query);

  if (!isNaN(query) || query.length == 0)
    return response.status(203).json({ message: "Invalid query!" });

  // const regex = new RegExp(".*" + query + ".*", "i");

  // const results = await Freelancers.find({
  //   // Update!!!!!!!!!!!!!!!!!!!
  //   $or: [{ username: { $regex: regex } }, { fullName: { $regex: regex } }],
  // }).distinct("_id");

  // return res.status(200).json(results);
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  searchFreelancers,
};
