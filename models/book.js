import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true},
  author: { type: String, required: true },
  owner: {type: 'ObjectId', ref: 'User', required: true},
  categories: [String]
});

// Do not use arrow syntax here - Prevents binding of this, so this would not refer to the book
bookSchema.methods.addCategory = function (category) {
  this.categories.push(category);
  return this.save();
};

bookSchema.statics.findByTitle = function(title) {
  return this.find({ title: new RegExp(title, 'i') });
};

bookSchema.query.byTitle = function(title) {
  return this.find({ title: new RegExp(title, 'i') });
}

export const Book = mongoose.model('Book', bookSchema);