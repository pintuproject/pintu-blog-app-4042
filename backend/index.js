const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const corsId={
  origin:"http://localhost:3000"
}
 
app.use(cors(corsId));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

    const authRoutes=require("./routes/auth")
    const blogRoutes=require("./routes/blog")
    app.use("/api/auth",authRoutes);
    app.use("/api/blog",blogRoutes)

    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});