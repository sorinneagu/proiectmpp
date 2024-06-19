import { db } from "../connect.js";

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
  const q = "SELECT * FROM announces WHERE idannounces = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const createAnnounce = (req, res) => {
  const values = [
    req.body.title,
    req.body.price,
    req.body.rating,
    req.body.description,
  ];

  const q =
    "INSERT INTO announces (title, price, rating, description) VALUES (?, ?, ?, ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json("Announce created");
    }
  });
};

export const updateAnnounce = (req, res) => {
  const values = [
    req.body.title,
    req.body.price,
    req.body.rating,
    req.body.description,
    req.params.id,
  ];
  const q =
    "UPDATE announces SET title = ?, price = ?, rating = ?, description = ? WHERE idannounces = ?";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json("Announce updated");
    }
  });
};

export const deleteAnnounce = (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM announces WHERE idannounces = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json("Announce deleted");
    }
  });
};
