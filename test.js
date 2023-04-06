var jwt = require("jsonwebtoken");
var uuid4 = require("uuid4");

var app_access_key = "642efe0debd76e1f89ad49f7";
var app_secret =
  "Z-2HuoizEee8tv-Wi8gKh2JeQUwxf9aiOiJvWK9rmkXUb0bryDX-_uBI_OE8Esfj7nJyFa6Wta769nwTXKCBPMkKupy1xoEKN3rR9Nwuv2UBgi-psUopPJCzAlUuMiiNEI7My02Uj53_-8hoNUKAzuAboBIzekFlGgXXWou6nik=";
var payload = {
  access_key: app_access_key,
  type: "management",
  version: 2,
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000),
};

jwt.sign(
  payload,
  app_secret,
  {
    algorithm: "HS256",
    expiresIn: "24h",
    jwtid: uuid4(),
  },
  function (err, token) {
    console.log(token);
  }
);
