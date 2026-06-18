import { pipe } from "effect"

type Writer<A> = [A, string]

type Chain = <A, B, C>
  (f: (a: A) => Writer<B>) => 
    (g: (b: B) => Writer<C>) => 
      (a: A) => Writer<C>

const chain: Chain = <A, B, C>(f: (a: A) => Writer<B>) => (g: (b: B) => Writer<C>) => (a: A) => {
  const [b, log1] = f(a)
  const [c, log2] = g(b)
  return [c, log1 + log2]
}

const of = <A>(a: A): Writer<A> => [a, '']

const upcase = (str: string): Writer<string> => [str.toUpperCase(), `upcase `]
const toWords = (str: string): Writer<string[]> => [str.split(' '), `toWords `]
const countWords = (words: string[]): Writer<number> => [words.length, `countWords`]

describe("upCase toWords countWords, then log the result", () => {
  
  it('should upcase the string and then split it into words', () => {
    expect(
      chain(upcase)(toWords)('hello world')
    ).toEqual(
      [['HELLO', 'WORLD'], 'upcase toWords ']
    )
  })

  it('should upcase the string, split it into words, and then count the words', () => {
    // chain(upcase)(chain(toWords)(countWords))
    const wordCount = pipe(
      countWords,
      (g) => chain(toWords)(g),
      (h) => chain(upcase)(h)
    )('hello world')

    expect(wordCount).toEqual([2, 'upcase toWords countWords'])
  })
})

describe('Proof Kleisli Category Laws', () => {

  it('should satisfy left identity law: chain(of)(f) = f', () => {
    expect(
      chain(of)(upcase)('hello world')
    ).toEqual(
      upcase('hello world')
    )
  })

  it('should satisfy right identity law: chain(f)(of) = f', () => {
    expect(
      chain(upcase)(of)('hello world')
    ).toEqual(
      upcase('hello world')
    )
  })

  it('should satisfy associativity law: chain(chain(f)(g))(h) = chain(f)(chain(g)(h))', () => {
    expect(
      chain<string, string[], number>(chain<string, string, string[]>(upcase)(toWords))(countWords)('hello world')
    ).toEqual(
      chain(upcase)(chain(toWords)(countWords))('hello world')
    )
  })
})