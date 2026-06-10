import { OrderInput, processOrder } from "./validateOrder"
import * as Either from "effect/Either"

describe('Monads', () => {
  it("should return Right when all business validations pass", () => {
    const validOrder: OrderInput = { customerId: "CUST-001", quantity: 2, paymentMethod: "CARD" }
    expect(
      processOrder(validOrder)
    ).toEqual(
      Either.right(validOrder)
    )
  })

  it("should return Left when customer validation fails", () => {
    const invalidCustomerOrder: OrderInput = { customerId: "GUEST-001", quantity: 2, paymentMethod: "CARD" }
    expect(
      processOrder(invalidCustomerOrder)
    ).toEqual(
      Either.left("Customer is not verified.")
    )
  })

  it("should return Left when inventory validation fails", () => {
    const invalidInventoryOrder: OrderInput = { customerId: "CUST-002", quantity: 99, paymentMethod: "PROMPTPAY" }
    expect(
      processOrder(invalidInventoryOrder)
    ).toEqual(
      Either.left("Inventory is not available for requested quantity.")
    )
  })

  it("should short-circuit and keep the first Left error", () => {
    const invalidMultiStepOrder: OrderInput = { customerId: "UNKNOWN", quantity: 99, paymentMethod: "CARD" }
    expect(
      processOrder(invalidMultiStepOrder)
    ).toEqual(
      Either.left("Customer is not verified.")
    )
  })
})