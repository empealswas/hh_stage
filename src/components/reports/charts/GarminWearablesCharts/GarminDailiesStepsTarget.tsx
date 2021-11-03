import React, { useState, useEffect } from 'react';

import { API, graphqlOperation } from "aws-amplify";
import { GarminDailiesSummaryModel } from "../../../../models/garminDataModels/garminDailiesModel";
import { GarminQueryData } from '../../../../models/garminDataModels/garminQueryData';
import { listPupils } from '../../../../graphql/queries';
import { Card, CardHeader } from '@material-ui/core';

export default function  DailiesStepsTarget(props: GarminQueryData){

    const [dailiesData, setData] = useState<GarminDailiesSummaryModel[] | null>(null);
    const queryURL: string = 
        `https://analytics.healthyhabits.link/api/garminDailies/dates/start/${props.startDate}/end/${props.endDate}/period/${props.period}/groupedby/${props.groupedBy}`;

        useEffect(() => {
            // get the users from the user database
            const getAllUsers = async () => {
                const users: String[] = [];
                const result: any = await API.graphql(graphqlOperation(listPupils));
                result.data.listPupils?.items.forEach((item: any) => {
                    users.push(item.id);
                })
                return users;
            }

            // fetch data from db- set headers
            const getData = async () => {
                const users = await getAllUsers();
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify(users);
    
                var requestOptions: any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                // send request
                fetch(queryURL, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        var garminData:  GarminDailiesSummaryModel[] = JSON.parse(result);
                        setData(garminData);
                    })
                    .catch(error => console.log('error', error));
            }
            getData();
          }, []);
          if (!dailiesData) {
            return (
                <Card>
                    <CardHeader title="Steps" subheader="No data" />
                </Card>
            );
        } else {
            console.log(dailiesData);
            return (
                <Card>
                    <CardHeader title="Steps" subheader="we got data!!" />
                </Card>
              );
        }

}