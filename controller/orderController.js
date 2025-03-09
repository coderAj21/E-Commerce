const {
    create_order_in_database,
    create_order_items_in_the_database,
} = require("../models/orderLogic");

exports.createOrder = async (req, res) => {
    try {
        let { user_id, total_amount, billing_address_id, order_items } = req.body;
        if (
            !user_id ||
            !total_amount ||
            !billing_address_id ||
            order_items.length < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required..",
            });
        }
        let order = await create_order_in_database(
            user_id,
            total_amount,
            billing_address_id,
            billing_address_id
        );
        if (!order.success) {
            return res.status(500).json({
                success: false,
                message: "Failed to create the order.",
            });
        }
        const order_item_response=await create_order_items_in_the_database(order?.data,order_items);
        if(!order_item_response.success){
            return res.status(200).json({
                success:false,
                message:"Order is Failed try again later..."
            })
        }
        return res.status(201).json({
            success: true,
            message: "Order Created Successfully..",
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Error in Creating Order..",
            error: error.message
        })
    }
};
