export type user = {
  id: number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: number,
      lng: number
    }
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
} 