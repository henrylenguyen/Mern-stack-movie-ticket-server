import fs from "fs";
import jwt  from 'jsonwebtoken';

export const kiemTra = (req, res, next) => {
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


export const kiemTraTokenNguoiDung = async (req, res, next) => {
  const authHeader = req.headers["usertoken"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_USER);
    req.userData = decoded;
    next();
  } catch (err) {
    console.error("Error occurred: ", err);
    return res.status(500).json({ message: "Lỗi" });
  }
};

