export interface IStatement {
  type: 'nagad' | 'bkash'
  mobile: string
  amount: number
  transactionNumber: string
  name: string
  prevBalance: number
  newBalance: number
}
