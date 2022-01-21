import { Icon } from '@iconify/react';
import { useState } from 'react';
import {Button, Menu, MenuItem, Typography} from "@mui/material";
import Iconify from "../../../../../../../components/Iconify";
// material

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'oldest', label: 'Oldest' },
  { value: 'newest', label: 'Newest' },
];

const  ProductSort = (props: any) => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {props.sortFilter}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === props.sortFilter}
            onClick={()=>{
                props.setSortFilter(option.value);
                handleClose()
            }}
            sx={{ typography: 'body2', width: '100%'}}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default ProductSort;
