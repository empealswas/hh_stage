import React, { useState } from 'react'

function GarminMetricSelector( {metricChanger, ...rest}) {
    let metricOptions = ["dailies", "sleep", "sedentary"];
    const [selectedMetric, setMetric]= useState("dailies");
   
    // changing selector values passed to:
    // metricChanger via metricChanger() passing the value back to the arent copmponent
    //  selectedPeriod via setPeriod() moving the selector dot in the radio button options
    return (
        <div>
            {metricOptions.map(result => (
                <>
                    <input 
                        type="radio" value={result} 
                        checked={selectedMetric===result}
                        name="radiovalues" onChange={
                            (p) =>  {
                                metricChanger(p.target.value);
                                setMetric(p.target.value);
                            }
                        }
                    />
                    <b>{result}</b>
                </>
            ))}
        </div>
    )
}
export default GarminMetricSelector;