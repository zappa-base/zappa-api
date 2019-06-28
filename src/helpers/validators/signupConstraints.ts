export const signupConstraints = {
  email: {
    email: true,
  },
  nickname: {
    length: {
      message: 'must be at least 6 characters',
      minimum: 4,
    },
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
