import Address from "../entity/address";
import EventDispatcher from "../event/@shared/event-dispatcher";
import EnviaConsoleLog1Handler from "../event/customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/customer/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/customer/handler/envia-console-log.handler";
import CustomerService from "./customer.service";

describe("Customer service unit tests", () => {

    afterEach(() => jest.restoreAllMocks());

    it("should create a customer and notify 2 handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyConsole = jest.spyOn(console, "log").mockImplementation(() => {});

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customerService = new CustomerService(eventDispatcher);
        const customer = customerService.createCustomer("c1", "John Doe");

        expect(customer.id).toBe("c1");
        expect(customer.name).toBe("John Doe");
        expect(spyEventHandler1).toHaveBeenCalledTimes(1);
        expect(spyEventHandler2).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
        expect(spyConsole).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
    });

    it("should change customer address and notify handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsole = jest.spyOn(console, "log").mockImplementation(() => {});

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const customerService = new CustomerService(eventDispatcher);
        const customer = customerService.createCustomer("c1", "John Doe");
        const address = new Address("Street 1", 123, "12345-678", "São Paulo");

        customerService.changeAddress(customer, address);

        expect(customer.Address).toBe(address);
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
        expect(spyConsole).toHaveBeenCalledWith(
            "Endereço do cliente: c1, John Doe alterado para: Street 1, 123, 12345-678 São Paulo"
        );
    });

    it("should not call address handler when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        jest.spyOn(console, "log").mockImplementation(() => {});

        new CustomerService(eventDispatcher).createCustomer("c1", "John Doe");

        expect(spyEventHandler).not.toHaveBeenCalled();
    });
});
