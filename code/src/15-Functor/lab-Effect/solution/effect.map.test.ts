import { some, none, map } from 'effect/Option'
import { pipe } from 'effect/Function'

const strLength = (x: string) => x.length
const increment = (x: number) => x + 1

describe('Map with Effect', () => {
  it('should be able to compose strLength and increment with map', () => {
    expect(
      pipe(
        some('abcd'), map(strLength), map(increment)
      )
    ).toEqual(some(5))

    expect(
      pipe(
        none(), map(strLength), map(increment)
      )
    ).toEqual(none())
  })
})