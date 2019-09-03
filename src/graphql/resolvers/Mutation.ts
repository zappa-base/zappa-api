import { createAlbum, deleteAlbum, updateAlbum } from './Album';
import { authorize } from './Auth/authorize';
import { confirmUser } from './Auth/confirmUser';
import { login } from './Auth/login';
import { requestReset } from './Auth/requestReset';
import { resendConfirmation } from './Auth/resendConfirmation';
import { resetPassword } from './Auth/resetPassword';
import { signup } from './Auth/signup';

export const Mutation = {
  authorize,
  confirmUser,
  createAlbum,
  deleteAlbum,
  login,
  requestReset,
  resendConfirmation,
  resetPassword,
  signup,
  updateAlbum,
};
