const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const initializePassport = require('./passport-config');
initializePassport(passport);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
,{
   useNewUrlParser:true, 
   useUnifiedTopology:true,
})
.then(() => {console.log("we are connected to the database.")})
.catch((error) => { console.log('an error occurred while connecting ot the db', error)})


const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes');



app.use('/api/orders',orderRoutes);
app.use('/api/customers',customerRoutes);
app.use('/api/products',productRoutes);
app.use('/api/inventory',inventoryRoutes);
app.use('/api/users',userRoutes);



app.all('*',(req, res) => {
    res.status(500);
    res.send('Invalid path');
})


app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"));
});