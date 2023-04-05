const kiemTra = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  // bearer  
  const token = authHeader && authHeader.split(" ")[1];
  
  if (token == null) return res.sendStatus(401);
  try {
    // alg mismatch
    var cert = fs.readFileSync("../key/publickey.crt"); // get public key
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
    res.status(500).json("Lỗi");
  }
}

export default kiemTra;