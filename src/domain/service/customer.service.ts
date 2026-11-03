import Customer from "../entity/customer";
import Address from "../entity/address";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";

export default class CustomerService {

    // O dispatcher é injetado: quem usa o service (ou o teste) decide
    // quais handlers estão registrados.
    constructor(private eventDispatcher: EventDispatcherInterface) {}

    createCustomer(id: string, name: string): Customer {
        const customer = new Customer(id, name);

        this.eventDispatcher.notify(new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
        }));

        return customer;
    }

    changeAddress(customer: Customer, address: Address): void {
        customer.changeAddress(address);

        this.eventDispatcher.notify(new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: address.toString(),
        }));
    }
}
