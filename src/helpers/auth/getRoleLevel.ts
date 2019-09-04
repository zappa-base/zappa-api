import { UserRole } from '../../db/entities/User';

export function getRoleLevel(role: UserRole) {
  switch (role) {
    case UserRole.WIZARD:
      return 4;
    case UserRole.ADMIN:
      return 3;
    case UserRole.MODERATOR:
      return 2;
    default:
      return 1;
  }
}
