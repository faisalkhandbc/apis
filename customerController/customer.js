const conn = require('../config/dbconnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { JWT_SECRET } = process.env

exports.signup = (req, res) => {

  const { name, email, password } = req.body;
  console.log(req.body)

  var sql = 'SELECT * FROM customer WHERE email=?';
  conn.query(sql, [email], (err, data) => {
    if (err) throw err
    else if (data & data.length) {
      res.json({
        msg: "Already exists"
      })
    }
    else {

      //         var sql = 'INSERT INTO customer (name, email, password) VALUES (?, ?, ?)';
      //     conn.query(sql, [name, email, password], (err, result) => {
      //   if (err) {
      //     res.status(500).json({ error: 'Failed to register custpmer.' });
      //   } else {
      //     res.status(200).json({ message: 'Customer registered successfully.' });
      //   }
      // });

      bcrypt.hash(password, 10, (err, hashpass)=>{
        if(err){
          throw err
        }
        else{
          var sql='INSERT INTO customer (name, email, password) VALUES(?,?,?)';
          conn.query(sql, [name, email, hashpass], (err, result)=>{
            if(err){
              throw err
            }
            else{
              res.json({
                msg:"Customer Added"
              })
            }
          })
        }
      })

    }
  })


}

exports.login = (req, res) => {


  const { email, password } = req.body;
  console.log(req.body)

  const sql = 'SELECT * FROM customer WHERE email = ?';
  conn.query(sql, [email], (err, results) => {
    if (err) {
      throw err;
    } else {
      const hashpassword = results[0].password;
        bcrypt.compare(password, hashpassword, (err, result)=>{
          if(err) throw err;
          if(!result){
            res.json({
              msg:"Wrong Password"
            })
          }
          const token = jwt.sign({id:results[0].id,email: results[0].email }, JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({
            msg: "Logged In Successfully",
            token
          });
        })
    }
  });
}

exports.getAllProducts = (req, res) => {
  var sql = 'SELECT * FROM products';
  conn.query(sql, (err, result) => {
    if (err) throw err;
    else {
      res.json({
        result
      })
    }
  })
}

exports.getCart = (req, res) => {
  const cartID = req.params.cartID;

  var sql = 'SELECT * FROM cart WHERE cartID=?'
  conn.query(sql, cartID, (err, result) => {
    if (err) throw err;

    res.json({
      result
    })
  })
}

exports.addtoCart = (req, res) => {
  // const id=req.params.id
  const customerID = req.params.customerID;
  const { productID, quantity } = req.body;

  var sql = 'INSERT INTO cart(customerID, productID, quantity) VALUES (?,?,?)'
  conn.query(sql, [customerID, productID, quantity], (err, result) => {
    if (err) throw err;
    else {
      res.json({
        message: "Added to Cart"
      })
    }
  })
}

exports.removeFromCart = (req, res) => {
  const { productID } = req.body

  var sql = 'DELETE FROM cart WHERE productID=?';
  conn.query(sql, productID, (err, result) => {
    if (err) throw err
    res.json({
      msg: "Product deleted from cart successfully"
    })
  })
}