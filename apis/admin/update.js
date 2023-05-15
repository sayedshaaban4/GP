const express = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const driverUpdateRouter = express.Router();

driverUpdateRouter.put('/api/admin/update' ,

    exports.update = (req, res) => {
        if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }

        if(req.body.userName || req.body.type || req.body.licence || req.body.nationalId){
            return res.status(400).send({
                message: "You can't update driver's : username or type or licence or nationl_id!"
              });
        }
      
        const user = req.body._id;
      
        User.findByIdAndUpdate(user, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Driver with username=${user}. Maybe Driver was not found!`
              });
            } else res.send({ message: "Driver's Info has updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Driver with username=" + user
            });
          });
    }

);

module.exports = driverUpdateRouter;