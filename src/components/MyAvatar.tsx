// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth();

  return (
    <Avatar
      alt={user?.firstName}
      color={createAvatar(`${user?.firstName} ${user?.lastName}` ?? '').color}
      {...other}
    >
      {createAvatar(`${user?.firstName} ${user?.lastName}`).name}
    </Avatar>
  );
}
