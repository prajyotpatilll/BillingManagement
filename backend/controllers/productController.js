import Product from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";
 // Ensure you have cloudinary configured

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({success: true, message: 'Products fetched successfully', products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.json({message: error.message ,success: false });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const { name, price, category, stock } = req.body;
    const imageFile = req.file;

    if (!name || !price || !category || !stock || !imageFile) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {
        let imageUrl = null;

        if (imageFile) {
            const uploadResult = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            imageUrl = uploadResult.secure_url;
        }

        const newProduct = new Product({
            name,
            price,
            category,
            stock,
            image: imageUrl
        });

        const savedProduct = await newProduct.save();
        res.json({savedProduct, success: true, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.json({ success: false, message: error.message });

    }
};

// Update product by ID
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const imageFile = req.file;

    try {
        if (imageFile) {
            const uploadResult = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            updates.image = uploadResult.secure_url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProduct) {
            return res.json({success: false, message: 'Product not found' });
        }

        res.json({success: true, message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.json({success: false, message: error.message });
    }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.json({success: false, message: 'Product not found' });
        }

        res.json({success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.json({success: false, message: error.message });
    }
};
