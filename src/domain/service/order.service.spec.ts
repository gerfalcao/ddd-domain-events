import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {

        const customer = new Customer("c1", "John")
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const order = OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(100)
        expect(order.total()).toBe(200)
    })

    it("should get total of all orders", () => {
    
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const order = new Order("o1", "c1", [item]);

        const order2 = new Order("o1", "c1", [item, item2]);

        const total = OrderService.total([order, order2])

        expect(total).toBe(800)
    });
});