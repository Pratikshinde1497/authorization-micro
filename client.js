const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("proto-services/services/authorize/service.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authorizePackage = grpcObject.authorizePackage;

const client = new authorizePackage.Authorize("localhost:4002", grpc.credentials.createInsecure());

client.authorizeUser({ user: { role: "admin", name: "pratik"}, allowedRoles: ['admin', 'user'] }, (err, res)=> {
  console.log(res);
})