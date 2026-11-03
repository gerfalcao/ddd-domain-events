import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.respository";
import Address from "../../domain/entity/address";

describe("Customer repository unit tests", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
            active: false,
            rewardPoints: 0
        });
    });

    it("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
            active: false,
            rewardPoints: 0,
        });
    })

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await customerRepository.find("1");

        expect(customerModel).toStrictEqual(customer);
    })

    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        await expect(customerRepository.find("1")).rejects.toThrow("Customer not found");
    })

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345", "City 1");
        customer.Address = address;
        customer.addRewardPoints(100);
        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 2, "123456", "City 2");
        customer2.Address = address2;
        customer2.addRewardPoints(200);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toEqual([customer, customer2]);
    })
})