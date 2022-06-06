import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
// components
import {Organization} from "../../../API";
import Iconify from "../../../components/Iconify";
import MenuPopover from "../../../components/MenuPopover";
import {PATH_DASHBOARD} from "../../../routes/paths";

// ----------------------------------------------------------------------

type Props = {
    id: string
};

export default function OrganizationMoreMenu({ id }: Props) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.root}/organization/${id}/manage`}
        >
          <Iconify icon={'eva:settings-outline'} sx={{ ...ICON }} />
          Manage
        </MenuItem>
      </MenuPopover>
    </>
  );
}
