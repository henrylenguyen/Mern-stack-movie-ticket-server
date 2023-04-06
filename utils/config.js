import fs from "fs";
import jwt  from 'jsonwebtoken';

const kiemTra = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // bearer  
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.sendStatus(401);
  
  try {
    var cert;
    try {
      cert = fs.readFileSync("./key/publickey.crt"); // get public key
    } catch (error) {
      throw new Error("Không đọc được key public");
    }
    jwt.verify(
      token,
      cert,
      { algorithms: ["RS256"] },
      function (err, payload) {
        if (err) {
          res.status(403).json("Token không hợp lệ");
        }
        next();
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json("Lỗi");
  }
}


export default kiemTra;