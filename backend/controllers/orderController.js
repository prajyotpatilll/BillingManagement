import Order from "../models/order.js";


// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product', 'name price');
    res.json({success: true, message: 'Orders fetched successfully', orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.json({success: false, message: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('products.product', 'name price');
    if (!order) return res.json({ message: 'Order not found' });
    res.json({success: true, message: 'Order fetched successfully', order });
  } catch (error) {
    console.error('Get order error:', error);
    res.json({success: false, message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { products, totalAmount, status } = req.body;

  if (!products || products.length === 0 || !totalAmount) {
    return res.json({success: false, message: 'Invalid order data' });
  }

  try {
    const newOrder = new Order({
      products,
      totalAmount,
      status: status || 'Pending',
      createdAt: new Date(),
    });
    const savedOrder = await newOrder.save();
    res.json({success: true, message: 'Order created successfully', savedOrder });
  } catch (error) {
    console.error('Create order error:', error);
    res.json({success: false, message: error.message });
  }
};

// Update order status by ID
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.json({ message: 'Status is required', success: false });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.json({ message: 'Order not found', success: false });
    res.json({updatedOrder, success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.json({ message: 'Server error', success: false });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.json({ message: 'Order not found',success: false });
    res.json({success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.json({success: false, message: error.message });
  }
};
