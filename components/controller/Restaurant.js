const Restaurant = require("../model/Restaurant");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.gmailusername}`,
    pass: `${process.env.gmailpassword}`
  }
});

//restaurant login
exports.loginRestaurant = async (req, res) => {
  try {
    cred = req.body;
    email = cred.restaurant_email;
    password = cred.restaurant_password;

    const data = await Restaurant.findOne({ restaurant_email: email });
    if (data) {
      if (password === data.restaurant_password) {
        process.env["restaurant_id"] = data._id;
        console.log(data);
        //store this restaurant owner data in local storage until login 
        res.json(data);
      } else {
        context = { "message": "Incorrect Password" };
        res.json(context);
      }
    } else {
      context = { "message": "User Not Found" };
      res.json(context);
    }
  } catch (err) {
    console.log(err);
    message = { "message": "Something went wrong" }
    res.json()
  }
}

//restaurant registration 
exports.registerRestaurant = async (req, res) => {
  try {

    Restaurant.findOne({ restaurant_email: req.body.restaurant_email }, (err, data) => {
      if (err) {
        context = { "message": "Email Already exist" };
        res.json(context);
      }
    });
    const restaurant = {
      restaurant_name: req.body.restaurant_name,
      restaurant_email: req.body.restaurant_email,
      restaurant_password: req.body.restaurant_password,
      restaurant_address: req.body.restaurant_address,
      restaurant_rating: 0,
      restaurant_total_reviews: 0,
      restaurant_positive_reviews: 0,
      restaurant_total_orders: 0,
      restaurant_total_tables: 0,
      restaurant_tables_occupied: 0,
      restaurant_url: ""
    }
    const newRestaurant = new Restaurant(restaurant)
    const response = await newRestaurant.save()

    //sending mail to the restaurant email once registered
    console.log(process.env.gmailusername, process.env.gmailpassword)
    const mailOptions = {
      from: `${process.env.gmailusername}`,
      to: restaurant.restaurant_email,
      subject: `Welcome to Touch Menu`,
      html: `<h1>Hello user, <br> your restaurant ${restaurant.restaurant_name} has been successfully registered in our system.</h1><hr>
            Kindly login to the restaurant panel to add the details like menu, tables, etc.
            `
    };

    //send mail 
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    context = { "message": "Registration Success" };
    res.json(context);
  } catch (err) {
    console.log(err);
    context = { "message": "Registration Failed" };
    res.json(context);
  }
}

exports.listRestaurants = async (req, res) => {
  try {
    const response = await Restaurant.find().sort({restaurant_rating:-1});
    res.json(response);
  } catch (err) {
    console.log(err);
  }
}

exports.getRestaurant = async (req, res) => {
  try {
    const id = req.body.id
    const response = await Restaurant.findById({ _id: id });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
}

exports.updateRestaurant = async (req, res) => {
  try {
    let data = req.body;
    let d = await Restaurant.findOne({_id:data.id});
    
    if(data.address ===""){
      data.address = d.address;
    }
    if(data.name===""){
      data.name = d.name;
    }
    if(data.tables===""){
      data.tables = 0;
    }

    const response = await Restaurant.findOneAndUpdate({_id:data.id},{restaurant_total_tables:data.tables,restaurant_name:data.name,restaurant_address:data.address,restaurant_url:data.url})

    res.json(response);
  } catch (err) {
    console.log(err);
  }
}