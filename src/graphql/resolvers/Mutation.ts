import { authorize } from './Auth/authorize';
import { login } from './Auth/login';
import { signup } from './Auth/signup';
import { confirmUser } from './Auth/confirmUser';

export const Mutation = {
  authorize,
  confirmUser,
  login,
  signup,
};