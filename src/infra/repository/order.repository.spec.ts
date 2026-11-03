import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.respository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import CustomerRepository from "./customer.respository";
import OrderRepository from "./order.respository";

describe("Order repository unit tests", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "1234567890", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", "Item 1", product.price, "1", 2);

        const orderRepository = new OrderRepository()
        const order = new Order("UUIDV4" as string, customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: [OrderItemModel]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                { id: orderItem.id, name: orderItem.name, price: orderItem.price, quantity: orderItem.quantity, product_id: product.id, order_id: "UUIDV4" }
            ]
        });
    });
})