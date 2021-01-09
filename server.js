const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("authorize.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authorizePackage = grpcObject.authorizePackage;

const server = new grpc.Server();
server.bind("localhost:4002", grpc.ServerCredentials.createInsecure());

server.addService(authorizePackage.Authorize.service, {
  "authorizeUser": authorizeUser
})

server.start();

async function authorizeUser(call, callback) {
  const {user, allowedRoles} = call.request;
  console.log(call.request);

  const isAllowed = () => {
    if (allowedRoles.includes(user.role)) {
      return true;
    }
    return false;
  }

  if (isAllowed()) {
    callback(null, { allowed: true })
  }
  else callback(null, { allowed: false });
}
