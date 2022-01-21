// hooks
// utils
//

// ----------------------------------------------------------------------

import {Pupil} from "../../../../API";
import createAvatar from "../../../../utils/createAvatar";
import Avatar from "../../../../components/Avatar";
import {AvatarProps} from "@mui/material";

interface Props extends AvatarProps {
  pupil: Pupil;
}

export default function ChildAvatar(props: Props) {
  const {pupil} = {...props};
  return (
    <Avatar
      alt={props.pupil?.firstName ?? ''}// @ts-ignore
      color={'secondary'}
      src={`https://avatars.dicebear.com/api/bottts/${pupil?.firstName}${pupil?.lastName}.svg?colorful%3Dtrue`}
      {...props}
    >
      {createAvatar(`${props.pupil?.firstName} ${props.pupil?.lastName}`).name}
    </Avatar>
  );
}
