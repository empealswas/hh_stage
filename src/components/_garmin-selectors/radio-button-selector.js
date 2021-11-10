import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function RadioButtonSelector( {periodChanger, period}) {
    let periodOptions = ["daily", "weekly", "monthly"];

    const handleChange = (event) => {
        periodChanger(event.target.value);
    };
    return (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Period</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    label="Period"
                    value={period}
                    onChange={handleChange}
                >
                    {periodOptions.map(result => (
                            <MenuItem value={result}>{result}</MenuItem>
                    ))}
                </Select>
            </FormControl>
    )
}
export default RadioButtonSelector;