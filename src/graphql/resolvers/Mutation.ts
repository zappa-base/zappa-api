import { authorize } from './Auth/authorize';
import { login } from './Auth/login';
import { signup } from './Auth/signup';
import { confirmUser } from './Auth/confirmUser';
import { resendConfirmation } from './Auth/resendConfirmation';

export const Mutation = {
  authorize,
  confirmUser,
  login,
  resendConfirmation,
  signup,
};