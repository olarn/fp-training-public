// a
type Fries = {
  size: 'small' | 'medium' | 'large'
}

// b
type Burger = {
  size: 'small' | 'medium' | 'large'
  type: 'beef' | 'chicken' | 'veggie'
}

// m :: c -> (a, b)
const orderMeal = (price: number): [Fries, Burger] => [
  { size: 'medium' },
  { size: 'medium', type: 'beef' }
]

// fst :: [a, b] -> a
const fst = <A, B>(pair: [A, B]): A => pair[0]

// snd :: [a, b] -> b
const snd = <A, B>(pair: [A, B]): B => pair[1]

// p :: c -> a
type OrderFries = (price: number) => Fries
const orderFries: OrderFries = (price: number) => ({ size: 'medium' })

// q :: c -> b
type OrderBurger = (price: number) => Burger
const orderBurger: OrderBurger = (price: number) => ({ size: 'medium', type: 'beef' })

// m' x = (p x, q x)
const orderMeal2 = (price: number): [Fries, Burger] => [
  // price should be split for fries and burger
  orderFries(price),
  orderBurger(price)
]

// factorizer :: (c -> a) -> (c -> b) -> (c -> (a, b))
// factorizer p q = \x -> (p x, q x)
const factorizer = <C, A, B>(p: (c: C) => A) =>
  (q: (c: C) => B) =>
    (c: C): [A, B] =>
      [p(c), q(c)]

const orderMeal3 = (p: OrderFries) => (q: OrderBurger) => (price: number): [Fries, Burger] => [
  // price should be split for fries and burger
  p(price),
  q(price)
]

describe('Product', () => {
  it('should order a meal with a medium fries and a medium burger', () => {
    const meal = orderMeal(10)
    expect(meal).toEqual([
      { size: 'medium' },
      { size: 'medium', type: 'beef' }
    ])
  })

  it('should get the fries from the meal', () => {
    const meal = orderMeal(10)
    expect(fst(meal)).toEqual({ size: 'medium' } as Fries)
  })

  it('should get the burger from the meal', () => {
    const meal = orderMeal(10)
    expect(snd(meal)).toEqual({ size: 'medium', type: 'beef' } as Burger)
  })

  it('should be the same as orderMeal2', () => {
    expect(
      orderMeal2(10)
    ).toEqual(
      orderMeal(10)
    )
  })

  it('should be the same as orderMeal3', () => {
    expect(
      orderMeal3(orderFries)(orderBurger)(10)
    ).toEqual(
      orderMeal2(10)
    )
  })

  it('should be the same as factorizer', () => {
    expect(
      factorizer(orderFries)(orderBurger)(10)
    ).toEqual(
      orderMeal3(orderFries)(orderBurger)(10)
    )
  })
})