import React, { useState } from 'react'

function RadioButtonSelector( {periodChanger, ...rest}) {
    let periodOptions = ["daily", "weekly", "monthly"];
    const [selectedPeriod, setPeriod]= useState("daily");
   
    // changing selector values passed to:
    // periodChanger via periodChanger() passing the value back to the arent copmponent
    //  selectedPeriod via eßtPeriod() moving the selector dot in the radio button options
    return (
        <div>
            {periodOptions.map(result => (
                <>
                    <input 
                        type="radio" value={result} 
                        checked={selectedPeriod===result}
                        name="radiovalues" onChange={
                            (p) =>  {
                                periodChanger(p.target.value);
                                setPeriod(p.target.value);
                            }
                        }
                    />
                    <b>{result}</b>
                </>
            ))}
            
            
        </div>
    )
}
export default RadioButtonSelector;