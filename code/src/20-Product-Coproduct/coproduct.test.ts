// Note: The example of Coproduct in Functional Programming is Either.

type Contact =
  | { type: 'PhoneNum'; value: number }
  | { type: 'EmailAddr'; value: string }

// i :: number -> Contact
const toPhone = (n: number): Contact => ({ type: 'PhoneNum', value: n })
// j :: string -> Contact
const toEmail = (e: string): Contact => ({ type: 'EmailAddr', value: e })

// i' :: number -> string
type PhoneToString = (phoneNum: number) => string
const phoneToString: PhoneToString = (phoneNum) => `Phone: ${phoneNum}`

// j' :: string -> string
type EmailToString = (emailAddr: string) => string
const emailToString: EmailToString = (emailAddr) => `Email: ${emailAddr}`

// m :: PhoneToString -> EmailToString -> Contact -> string
type MatchContact = (p: PhoneToString) => (e: EmailToString) => (contact: Contact) => string
const matchContact: MatchContact = p => e => contact =>
  contact.type === 'PhoneNum' ? p(contact.value) : e(contact.value)

describe('Co-Product', () => {
  it('should match phone contact to string', () => {
    expect(
      matchContact(phoneToString)(emailToString)(toPhone(1234567890))
    ).toEqual('Phone: 1234567890')
  })

  it('should match email contact to string', () => {
    expect(
      matchContact(phoneToString)(emailToString)(toEmail('test@example.com'))
    ).toEqual('Email: test@example.com')
  })
})