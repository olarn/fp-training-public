import { flow } from "effect/Function"

type Item = {}
type Cart = {}
type PendingOrder = {}
type PaidOrder = {}
type PreparedOrder = {}
type ShippedOrder = {}

const add = (item: Item): Cart => ({})
const checkout = (cart: Cart): PendingOrder => ({})
const pay = (order: PendingOrder): PaidOrder => ({})
const prepare = (order: PaidOrder): PreparedOrder => ({})
const ship = (order: PreparedOrder): ShippedOrder => ({})

const shoppingFlow = flow(add, checkout, pay, prepare, ship)
const oneClickCheckout = flow(add, checkout)
const oneClickShippingFlow = flow(oneClickCheckout, pay, prepare, ship)

describe('Shipping Specific Type', () => {
  const item = {}

  it('should proof the flow of online shopping to shipped order', () => {
    expect(
      shoppingFlow(item)
    ).toEqual({})
  })

  it('should compose the flow of online shopping with one-click checkout', () => {
    expect(
      oneClickShippingFlow(item)
    ).toEqual(
      shoppingFlow(item)
    )
  })
})