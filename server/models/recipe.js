const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;


