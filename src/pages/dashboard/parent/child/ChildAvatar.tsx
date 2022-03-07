// hooks
// utils
//

// ----------------------------------------------------------------------

import {Pupil} from "../../../../API";
import createAvatar from "../../../../utils/createAvatar";
import Avatar from "../../../../components/Avatar";
import {AvatarProps} from "@mui/material";
import useAuth from "../../../../hooks/useAuth";



export default function ChildAvatar(props: AvatarProps) {
  const {user} = useAuth();
  return (
    <Avatar
      alt={user?.firstName ?? ''}// @ts-ignore
      color={'secondary'}
      src={`https://avatars.dicebear.com/api/bottts/${user?.firstName}${user?.lastName}.svg?colorful%3Dtrue`}
      {...props}
    >
      {createAvatar(`${user?.firstName} ${user?.lastName}`).name}
    </Avatar>
  );
}
