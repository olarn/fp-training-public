import * as Either from 'effect/Either'

type Item = { name: string }
type Cart = { items: Item[] }
type PendingOrder = { items: Item[], amount: number }
type PaidOrder = { items: Item[], amount: number, paymentMethod: string }
type PreparedOrder = { items: Item[], amount: number, paymentMethod: string, shippingLabel: string }
type ShippedOrder = { items: Item[], amount: number, paymentMethod: string, shippingLabel: string, trackingNumber: string }

const add = (item: Item): Either.Either<Cart, string> =>
  item.name === ''
    ? Either.left('Item name is required')
    : Either.right({ items: [item] })

const checkout = (cart: Cart): Either.Either<PendingOrder, string> =>
  cart.items.length === 0
    ? Either.left('Cart is empty')
    : Either.right({
      items: cart.items, amount: cart.items.reduce((acc, item) => acc + item.name.length, 0)
    })

const pay = (payment: string) => (order: PendingOrder): Either.Either<PaidOrder, string> =>
  payment === ''
    ? Either.left('Payment method is required')
    : Either.right({
      items: order.items, amount: order.amount, paymentMethod: payment
    })

const prepare = (ship: string) => (order: PaidOrder): Either.Either<PreparedOrder, string> =>
  ship === ''
    ? Either.left('Shipping label is required')
    : Either.right({
      items: order.items, amount: order.amount, paymentMethod: order.paymentMethod, shippingLabel: ship
    })

const ship = (trackingNumber: string) => (order: PreparedOrder): Either.Either<ShippedOrder, string> =>
  trackingNumber === ''
    ? Either.left('Tracking number is required')
    : Either.right({
      items: order.items, amount: order.amount, paymentMethod: order.paymentMethod, shippingLabel: order.shippingLabel, trackingNumber: trackingNumber
    })

export { add, checkout, pay, prepare, ship }