const mongoose =require(`mongoose`)

//1-cereate sckema
const carogrySchema = new mongoose.Schema({
    name : {
        type :String,
        required :[true ,"category required "],
        unique :[true ,"category must be unique "],
        minlength :[3 , "too short category name "],
        maxlength : [32 , "too long category name "]
    },
        //A and B ======>(url) shoping.com/a_and_b
    slug :{
        type : String,
        lowerCase : true,
    },
    image :String,

},{timestamps:true}
);
 
//2-create model
const catogryModel = mongoose.model("category"  ,carogrySchema)


module.exports =catogryModel;