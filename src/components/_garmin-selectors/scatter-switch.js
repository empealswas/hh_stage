import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ScatterPlotSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

function ScatterSwitch({totAveChanger, switchVal}) {

    const handleAlignment = (event, newAlignment) => {
        if (switchVal !== null) {
            totAveChanger(newAlignment);
        }
    };

    return (
        <ToggleButtonGroup
            value={switchVal}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            color="error"
        >
            <ToggleButton value="plot" aria-label="left aligned">
                Plot
            </ToggleButton>
            <ToggleButton value="table" aria-label="centered">
                Table
            </ToggleButton>
        </ToggleButtonGroup>
      );
}

export default ScatterSwitch;