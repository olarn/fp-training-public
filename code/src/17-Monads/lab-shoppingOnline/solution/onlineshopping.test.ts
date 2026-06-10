import { pipe } from "effect/Function"
import * as Either from 'effect/Either'
import { add, checkout, pay, prepare, ship } from './onlineshopping'

describe('Online Shopping', () => {
  it('should process an order successfully', () => {
    expect(
      pipe(
        { name: 'Laptop' },
        add,
        Either.flatMap(checkout),
        Either.flatMap(pay('CARD')),
        Either.flatMap(prepare('TH1234567890')),
        Either.flatMap(ship('4th Somewhere Road, Anytown, USA, 12345'))
      )
    ).toEqual(
      Either.right({
        items: [{ name: 'Laptop' }],
        amount: 6,
        paymentMethod: 'CARD',
        shippingLabel: 'TH1234567890',
        trackingNumber: '4th Somewhere Road, Anytown, USA, 12345'
      })
    )
  })

  it('should return an error when the item name is empty', () => {
    expect(
      pipe(
        { name: '' },
        add,
        Either.flatMap(checkout),
        Either.flatMap(pay('CARD')),
        Either.flatMap(prepare('TH1234567890')),
        Either.flatMap(ship('4th Somewhere Road, Anytown, USA, 12345'))
      )
    ).toEqual(
      Either.left('Item name is required')
    )
  })

  it('should return an error when the cart is empty', () => {
    expect(
      pipe(
        { items: [] },
        checkout,
        Either.flatMap(pay('')),
        Either.flatMap(prepare('TH1234567890')),
        Either.flatMap(ship('4th Somewhere Road, Anytown, USA, 12345'))
      )
    ).toEqual(
      Either.left('Cart is empty')
    )
  })

  it('should return an error when payment method is empty', () => {
    expect(
      pipe(
        { name: 'Laptop' },
        add,
        Either.flatMap(checkout),
        Either.flatMap(pay('')),
        Either.flatMap(prepare('TH1234567890')),
        Either.flatMap(ship('4th Somewhere Road, Anytown, USA, 12345'))
      )
    ).toEqual(
      Either.left('Payment method is required')
    )
  })

  it('should return error when shipping label is empty', () => {
    expect(
      pipe(
        { name: 'Laptop' },
        add,
        Either.flatMap(checkout),
        Either.flatMap(pay('CARD')),
        Either.flatMap(prepare('')),
        Either.flatMap(ship('4th Somewhere Road, Anytown, USA, 12345'))
      )
    ).toEqual(
      Either.left('Shipping label is required')
    )
  })

  it('should return error when tracking number is empty', () => {
    expect(
      pipe(
        { name: 'Laptop' },
        add,
        Either.flatMap(checkout),
        Either.flatMap(pay('CARD')),
        Either.flatMap(prepare('TH1234567890')),
        Either.flatMap(ship('')),
      )
    ).toEqual(
      Either.left('Tracking number is required')
    )
  })
})