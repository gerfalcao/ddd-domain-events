import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should get 1 as result", () => {
        const result = 1;
        expect(result).toBe(1);
    })

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })

})