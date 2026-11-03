import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {

    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            })),
        },
        {
            include: [{model: OrderItemModel}]
        }
        );
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update({
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: order.id
            }))
        }, {
            where: { id: order.id },
        })
    }

    async find(id: string): Promise<Customer> {
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({ 
                where: { 
                    id 
                }, 
                rejectOnEmpty: true 
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
        customer.Address = address;
        customer.addRewardPoints(customerModel.rewardPoints);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        const result = customerModels.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
            customer.Address = address;
            customer.addRewardPoints(customerModel.rewardPoints);
            return customer;
        });
        return result;
    }
}