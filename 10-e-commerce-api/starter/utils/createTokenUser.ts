const createTokenUser = (user: any) => {
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  return tokenUser;
};

export default createTokenUser;
