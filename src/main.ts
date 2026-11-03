import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("1000", "Germanno")
const address = new Address('Rua Um', 127, "13087170", "Campinas")

customer.Address = address;
customer.activate();
// ID

// objeto
// const item1 = new OrderItem('123', 'Laptop', 15)
// const item2 = new OrderItem('124', 'Celular', 16)

// const order = new Order('123', '1000', [item1, item2])