import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error if id is empty", () => {
        expect(() => {

            const product = new Product('', 'Product 1', 100)

        }).toThrowError("ID is required");
    })
    it("should throw error if name is empty", () => {
        expect(() => {
            const product = new Product('123', '', 100)
        }).toThrowError("Name is required");
    })
    it("should throw error if price is less than 0", () => {
        expect(() => {
            const product = new Product('123', 'Product 1', -1)
        }).toThrowError("Price must be greater than 0");
    })

    it("sould change name",() => {
        const product = new Product('123', 'Product 1', 100)
        product.changeName('Product 2')
        expect(product.name).toBe('Product 2');
    })

    it("should change price", () => {
        const product = new Product('123', 'Product 1', 100)
        product.changePrice(150)
        expect(product.price).toBe(150);
    })
})