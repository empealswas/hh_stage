import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import SchoolHousesBarchart, {HouseData} from "../components/reports/charts/SchoolHousesBarchart";
import {API, graphqlOperation} from "aws-amplify";
import LinearProgressBottom from "../utils/LinearProgressBottom";

const houseQuery = `query MyQuery {
  listSchoolHouses {
    items {
      name
      Pupils {
        items {
          Attendances(filter: {wasRewarded: {attributeExists: true}, and: {wasRewarded: {eq: true}}}) {
            items {
              id
            }
          }
        }
      }
    }
  }
}
`

const SchoolHousesPage = () => {
    const [houseData, setHouseData] = useState<HouseData[] | null>(null);
    useEffect(() => {
        const getData = async () => {
            const result: any = await API.graphql(graphqlOperation(houseQuery));
            console.log(result)
            setHouseData(result.data.listSchoolHouses.items?.map((item: any) => {
                let sum = 0;
                const trophiesOfHouse = item.Pupils.items.map((item: any) => item.Attendances.items.length).forEach((item: number) => {
                    sum += item;
                })
                return {
                    houseName: item.name,
                    amountOfTrophies: sum
                }
            }))
        }
        getData();
        return () => {

        };
    }, []);

    return (
        <>
            {houseData ?
                <SchoolHousesBarchart houses={houseData}/>
                :
                <LinearProgressBottom/>
            }
        </>
    );
};

export default SchoolHousesPage;
