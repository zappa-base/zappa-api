export const loginConstraints = {
  email: {
    email: true,
  },
  nickname: {
    presence: true,
  },
  password: {
    length: {
      message: 'must be at least 6 characters',
      minimum: 6,
    },
    presence: true,
  },
};
