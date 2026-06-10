import * as Either from "effect/Either"
import { flow } from "effect/Function"

export type OrderInput = Readonly<{
  customerId: string
  quantity: number
  paymentMethod: "CARD" | "PROMPTPAY"
}>

const validateCustomer = (input: OrderInput): Either.Either<OrderInput, string> =>
  input.customerId.startsWith("CUST-")
    ? Either.right(input)
    : Either.left("Customer is not verified.")

const validateInventory = (input: OrderInput): Either.Either<OrderInput, string> =>
  input.quantity > 0 && input.quantity <= 10
    ? Either.right(input)
    : Either.left("Inventory is not available for requested quantity.")

const validatePayment = (input: OrderInput): Either.Either<OrderInput, string> =>
  input.paymentMethod === "CARD" || input.paymentMethod === "PROMPTPAY"
    ? Either.right(input)
    : Either.left("Payment method is not supported.")

export const processOrder = flow(
  validateCustomer,
  Either.flatMap(validateInventory),
  Either.flatMap(validatePayment)
)