const mongoose = require(`mongoose`);

//1-cereate sckema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required "],
      unique: [true, "Brand must be unique "],
      minlength: [3, "too short Brand name "],
      maxlength: [32, "too long Brand name "],
    },
    //A and B ======>(url) shoping.com/a_and_b
    slug: {
      type: String,
      lowerCase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//2-create model
module.exports = mongoose.model("Brand", brandSchema);
// demo
