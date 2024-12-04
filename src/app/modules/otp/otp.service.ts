const createOTPIntoDB = async (payload: string) => {
  console.log(payload)

  //   const isUserExists = await User.findOne({ email: payload?.email })

  //   if (!isUserExists) {
  //     throw new AppError(
  //       httpStatus.NOT_FOUND,
  //       'User not found',
  //       'User not found!',
  //     )
  //   }
  //   const result = await CancelReq.create({ ...payload, user: user?._id })

  return payload
}

export const otpServices = { createOTPIntoDB }
