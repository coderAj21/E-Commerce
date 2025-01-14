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
        const orderItemsResults = await Promise.all(
            order_items.map((item) =>
                create_order_items_in_the_database(
                    order.data, // Assuming `order.data` contains the order ID
                    item.product_id,
                    item.quantity,
                    item.price,
                    item.total_price,
                    item.flavour_id,
                    item.weight_id
                )
            )
        );
        
        const failedItems = orderItemsResults.find((result) => !result.success);
        if (failedItems) {
            return res.status(500).json({
                success: false,
                message: "Failed to create some order items.",
            });
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
