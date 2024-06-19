import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getReviews = (req, res) => {
  const q = "SELECT * FROM reviews WHERE idannounce = ?";
  db.query(q, [req.query.idannounce], (err, data) => {
    if (err) {
      return res.status(500).json(err);
      console.log(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

export const createReview = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const values = [
      req.body.rating,
      req.body.review,
      req.body.idannounce,
      userInfo.id, // get the user id from the user that is currently logged in
    ];
    const q =
      "INSERT INTO reviews(rating, review, idannounce, iduser) VALUES (?)";
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        return res.status(200).json("Review has been created!");
      }
    });
  });
};

export const deleteReview = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = "SELECT iduser FROM reviews WHERE idreviews = ?";
    db.query(query, req.params.id, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      } else if (data[0].iduser !== userInfo.id) {
        return res.status(403).json("You are not the owner of this announce");
      } else {
        const reviewID = req.params.id;
        const q = "DELETE FROM reviews WHERE idreviews = ? AND iduser = ?";
        db.query(q, [reviewID, userInfo.id], (err, data) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json("Review deleted");
          }
        });
      }
    });
  });
};
