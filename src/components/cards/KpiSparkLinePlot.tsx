
import { useEffect, useState } from "react";

function convertDateToString(date: Date){
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
}

export default function KpiSparklinePlot(props: any) {
    // const [dateRange, setDateRange] = useState<any[]>([]);
const [periodState, setPeriodState] = useState("week");
const [dateRangeState, setDateRange] = useState<string[]>([]);


useEffect(() => {
    const getdates = async ()=> {
        let endDate = new Date();
        let startDate = new Date();
        let dateRange = [];
        if(periodState==="week"){
            // set start date to prev week
            startDate.setDate(startDate.getDate() - 6)
        } else {
            //set start date to first of month
            startDate.setDate(1)
        }

        while(startDate < endDate){
            // convert startDate to string and piush to array
            let dateRec = convertDateToString(startDate);
            dateRange.push(dateRec);
            startDate.setDate(startDate.getDate() +1)
        };
        // add current date to array then set const
        dateRange.push(convertDateToString(endDate));
        setDateRange(dateRange);
    }
    getdates();
}, [props]);
return(
    <div>
        <h1> sparklinr</h1>
    </div>
)
}
