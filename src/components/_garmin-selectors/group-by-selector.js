import React, { useState } from 'react'

function GroupBySelector( {groupByChanger, ...rest}) {
    let groupByOptions = ["group", "user"];
    const [selectedGroupBy, selectGroupBy]= useState("group");
   
    // changing selector values passed to:
    // groupByChanger via groupByChanger() passing the value back to the arent copmponent
    // selectedGroupBy via selectedGroupBy() moving the selector dot in the radio button options
    return (
        <div>
            {groupByOptions.map(result => (
                <>
                    <input 
                        type="radio" value={result} 
                        checked={selectedGroupBy===result}
                        name="radiovalues" onChange={
                            (p) =>  {
                                groupByChanger(p.target.value);
                                selectGroupBy(p.target.value);
                            }
                        }
                    />
                    <b>{result}</b>
                </>
            ))}
        </div>
    )
}
export default GroupBySelector;