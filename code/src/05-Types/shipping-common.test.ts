import { append, isNonEmptyArray, NonEmptyArray, map } from "effect/Array"
import { flow } from "effect/Function"

type Item = Readonly<{
  name: string
  price: number
  quantity: number
}>

const addFee = (item: Item): Item => ({ ...item, price: item.price * 1.01 })

const submit = (items: Item[] = []) =>
  (item: Item) =>
    isNonEmptyArray(items)
      ? append(item)(items)
      : [item] satisfies NonEmptyArray<Item>

const ship = (items: NonEmptyArray<Item>): ReadonlyArray<Item> =>
  map(addFee)(items)

const submitAndShip = flow(submit(), ship)

describe('Shipping', () => {
  it('should add fee to items', () => {
    const item1: Item = { name: 'Item 1', price: 10, quantity: 10 }
    const items = submitAndShip(item1)
    expect(
      items[0]
    ).toEqual(
      { name: 'Item 1', price: 10.1, quantity: 10 }
    )
  })
})

export { Item, addFee, submit, ship, submitAndShip }