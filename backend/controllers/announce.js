import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getAnnounces = (req, res) => {
  const q = "SELECT * FROM announces";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
      console.log(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const getAnnounce = (req, res) => {
  const id = req.params.id;
  //const q = "SELECT * FROM announces WHERE idannounces = ?";
  const q =
    "SELECT announces.*, users.username FROM ANNOUNCES JOIN users ON announces.idusers = users.idusers WHERE idannounces = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const createAnnounce = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const values = [
      req.body.title,
      req.body.price,
      req.body.description,
      userInfo.id,
    ];

    const q =
      "INSERT INTO announces (title, price, description, idusers) VALUES (?, ?, ?, ?)";
    db.query(q, values, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json("Announce created");
      }
    });
  });
};

export const updateAnnounce = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const query = "SELECT idusers FROM announces WHERE idannounces = ?";
    db.query(query, req.params.id, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else if (data.length === 0) {
        return res.status(404).json("Announce not found");
      } else if (data[0].idusers !== userInfo.id) {
        return res.status(403).json("You are not the owner of this announce");
      } else {
        const values = [
          req.body.title,
          req.body.price,
          req.body.description,
          req.params.id,
        ];
        const q =
          "UPDATE announces SET title = ?, price = ?, description = ? WHERE idannounces = ?";
        db.query(q, values, (err, data) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json("Announce updated");
          }
        });
      }
    });
  });
};

export const deleteAnnounce = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const query = "SELECT idusers FROM announces WHERE idannounces = ?";
    db.query(query, req.params.id, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else if (data[0].idusers !== userInfo.id) {
        return res.status(403).json("You are not the owner of this announce");
      } else {
        const id = req.params.id;
        const q = "DELETE FROM announces WHERE idannounces = ?";
        db.query(q, [id, userInfo.id], (err, data) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json("Announce deleted");
          }
        });
      }
    });
  });
};
