import { JwtPayload } from 'jsonwebtoken'
import { Expense } from './expense.model'
import QueryBuilder from '../../builder/QueryBuilder'

const addExpenseIntoDB = async (payload: {
  amount: number
  description: 'string'
}) => {
  const result = await Expense.create(payload)
  return result
}

const getExpenseListFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // const result = await Order.find({}).populate('user', 'name')
  // return result
  const statementQuery = new QueryBuilder(Expense.find(), query, user)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await statementQuery.countTotal()
  const result = await statementQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const expenseServices = {
  addExpenseIntoDB,
  getExpenseListFromDB,
}
