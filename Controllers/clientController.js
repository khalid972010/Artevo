const Clients = require("../Models/ClientModel");
const ClientValidator = require("../Validators/ClientValidator");

let getAllClients = async (request, response) => {
  let allClients = await Clients.find({});
  response.status(200).json({ data: allClients });
};

let getClient = async (request, response) => {
  let ID = request.params.id;
  let client = Clients.findOne({ _id: ID });
  if (client == undefined) {
    response.status(404).json({ message: "Client not found!" });
  }
  response.status(200).json({ data: client });
};

let createClient = async (request, response) => {
  let client = request.body;
  if (await Clients.findOne({ email: client.email })) {
    response.json({ message: "Mail already exists!" });
  } else if (await Clients.findOne({ userName: client.userName })) {
    response.json({ message: "user name already exists!" });
  } else {
    if (ClientValidator(client)) {
      await Clients.create(client);
      response.status(201).json({ message: "Client added", data: { client } });
    } else {
      response.json({
        message:
          ClientValidator.errors[0].instancePath.substring(1) +
          " " +
          ClientValidator.errors[0].message,
      });
    }
  }
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
};
