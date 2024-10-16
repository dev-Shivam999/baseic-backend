import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/api")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));


const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})
export const User = mongoose.model('User', schema)

