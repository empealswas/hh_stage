import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function GarminMetricSelector( {metricChanger, metric}) {
    let metricOptions = ["dailies", "sleep", "sedentary"];

    const handleChange = (event) => {
        metricChanger(event.target.value);
    };
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label3">Metric</InputLabel>
            <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select1"
                label="Period"
                value={metric}
                onChange={handleChange}
            >
                {metricOptions.map(result => (
                    <MenuItem value={result}>{result}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default GarminMetricSelector;