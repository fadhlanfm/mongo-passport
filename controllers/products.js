const Product = require("../models/products")

class ProductsController {
  static async getProducts (req, res) {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async createProduct (req, res) {
    const product = new Product(req.body)
    try {
      const savedProduct = await product.save()
      res.status(201).json(savedProduct)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async getProductById (req, res) {
    try {
      const product = await Product.findById(req.params.id)
      res.json(product)
    } catch (error) {
      res.status(404).json({message: error.message});
    }
  }

  static async updateProduct (req, res) {
    try {
      const id = req.params.id
      const product = await Product.findById(id)
      if (!product) {
        res.status(404).json({message: "Data tidak ditemukan"}); 
      }
      const updatedProduct = await Product.updateOne({ _id: id}, { $set: req.body })
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }

  static async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      const deletedProduct = await Product.deleteOne({ _id: id})
      res.status(200).json(deletedProduct)
    } catch (error) {
      if (error.name == "CastError" && error.kind === "ObjectId") {
        res.status(404).json({message: `id ${id} not found`});
      }
      res.status(500).json({message: error.message});
    }
  }
}

module.exports = ProductsController;