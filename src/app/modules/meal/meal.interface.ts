export interface IMeal {
  name: string
  type: 'breakfast' | 'lunch' | 'dinner'
  price: number
  stock: number
  description: string
}
