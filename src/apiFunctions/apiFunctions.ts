import {AddParentRequest, AddTeacherOrganizationRequest, AddTeacherRequest} from "./DTO/AddTeacherRequest";
import {API} from "aws-amplify";
import {ResendTeacherInvitation} from "./DTO/ResendTeacherInvitation";
import {PupilActivityRequest} from "./DTO/PupilActivityRequest";
import {result} from "lodash";
import {format} from "date-fns";

const apiName = 'HealthyHabitsV2API'

export type TerraWearables = {
    idList: string[],
    grouping: 'user' | 'group',
    category: 'activity' | 'daily' | 'sleep',
    subtype: 'steps' | 'distance' | 'duration' | 'calories' | 'durationTotal' | 'durationRem' | 'durationDeep' | 'durationAwake' | 'durationOther' | 'efficiency';
    period: 'day' | 'week' | 'month' | 'year' | 'millennium',
    startDate: string,
    endDate: string,
    returnType: 'total' | 'average' | 'stanine';
}

export async function addTeacherApi(params: AddTeacherRequest) {

    const result = await API.post(apiName, '/api/addTeacher', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}

export async function subscribeToNotifications(subscription: any): Promise<any> {
    return Promise.resolve(await API.post(apiName, '/subscribe', {
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json',
        }
    }));
}

export async function getWidgetLink(data: any): Promise<any> {
    const result: any = await API.post(apiName, '/api/getTerraLink', {
        body: {...data},
        headers: {
            'content-type': 'application/json',
        }
    });
    return result;
}

export async function getPupilActivity(params: PupilActivityRequest) {
    console.log(params);
    const result = await API.post(apiName, '/api/getActivity', {
        body: {
            ...params,
        }
    });
    console.log(result)
    return result;
}

export async function getWearablesData(params: TerraWearables) {
    const result = await API.post(apiName, '/api/wearables', {
        body: {...params}
    });
    console.log(result)
    return result;
}

export async function getSleepDataAsync(params: PupilActivityRequest) {
    const result = await API.post(apiName, '/api/getSleep', {
        body: {
            ...params,
        }
    });
    console.log(result)
    return result;
}

export async function getPupilWearableDeviceStatus(terraId: string) {
    const result = await API.get(apiName, '/api/userInfo', {
        queryStringParameters: {  // OPTIONAL
            user_id: terraId
        },
    });
    console.log(result);
    return result;

}

export async function addTeacherForOrganizationApi(params: AddTeacherOrganizationRequest) {
    const result = await API.post(apiName, '/api/addTeacherOrganization', {
        body: {
            ...params
        }
    });
    console.log(result);
    console.log('Added');
}

export async function addParentApi(params: AddParentRequest) {
    const result = await API.post(apiName, '/api/addParent', {
        body: {
            ...params
        }
    });
    return result;
}

export async function addPrincipalApi(params: AddParentRequest) {
    const result = await API.post(apiName, '/api/addPrincipal', {
        body: {
            ...params
        }
    });
    return result;
}

export async function listUnconfirmedOrganizations() {
    const result = await API.get(apiName, '/api/listUnconfirmedOrganizations', {});
    return result;
}

type ConfirmOrganizationParams = {
    email: string
}

export async function confirmOrganization(params: ConfirmOrganizationParams) {
    console.log(params)
    const result = await API.post(apiName, '/api/confirmOrganization', {
        body: {
            ...params
        }
    });
    console.log(result)
    return result;
}


export async function getAverage() {
    return Promise.resolve(await API.get(apiName, '/api/getAverage', {}));
}

export async function resendCodeToTeacher(params: ResendTeacherInvitation) {
    const result = await API.post(apiName, '/api/resendTeacherInvitation', {
        body: {
            ...params
        }
    });
}


export async function genUrlOfThumbnailOfFile(fileName: string) {

    const result = await API.get(apiName, '/api/getUrlToObject', {
        queryStringParameters: {  // OPTIONAL
            name: fileName
        },
    })
    return result;
}

export async function deleteFileById(id: string) {

    const result = await API.del(apiName, `/api/deleteFile/${id}`, {})
    return result;
}

export async function getActivityMinutes(id: any, date: any, name: any) {
    const result = await API.get(apiName, '/api/activityminutes', {
         queryStringParameters: {
             id: id,
             date: format(date, "yyyy-MM-dd"),
             name: name
         }
    });
    return result;
}

export async function getDailySteps(id: any, date: any, name: any) {
    const result = await API.get(apiName, '/api/dailysteps', {
         queryStringParameters: {
             id: id,
             date: format(date, "yyyy-MM-dd"),
             name: name
         }
    });
    return result;
}

export async function getSleepDuration(id: any, date: any, name: any) {
    const result = await API.get(apiName, '/api/sleepduration', {
         queryStringParameters: {
             id: id,
             date: format(date, "yyyy-MM-dd"),
             name: name
         }
    });
    return result;
}

export async function getWeeklyAvgSteps(id: any, date1: any, date2: any, name: any) {
    const result = await API.get(apiName, '/api/weeklyavgsteps', {
         queryStringParameters: {
             id: id,
             date1: format(date1, "yyyy-MM-dd"),
             date2: format(date2, "yyyy-MM-dd"),
             name: name
         }
    });
    return result;
}

export async function getAverageDailySleep(terraIds: any, startDate: any, endDate: any) {
    let theStartDate = startDate;
    let theEndDate = endDate;
    if (!theStartDate || !theEndDate) {
        theStartDate = new Date("1970-01-01");
        theEndDate = new Date();
    }
    let requestBody = {
        "idList": terraIds,
        "grouping": "group",
        "category": "sleep",
        "subtype": "durationTotal",
        "period": "millennium",
        "startDate": format(theStartDate, "yyyy-MM-dd"),
        "endDate": format(theEndDate, "yyyy-MM-dd"),
        "returnType": "average"
    };
    const result = await API.post(apiName, '/api/wearables', {
        body: {...requestBody}
    });
    return result?.data[0]?.value ?? 0;
}

export async function getAverageDailyActivity(terraIds: any, startDate: any, endDate: any) {
    let theStartDate = startDate;
    let theEndDate = endDate;
    if (!theStartDate || !theEndDate) {
        theStartDate = new Date("1970-01-01");
        theEndDate = new Date();
    }
    let requestBody = {
        "idList": terraIds,
        "grouping": "group",
        "category": "daily",
        "subtype": "activity",
        "period": "millennium",
        "startDate": format(theStartDate, "yyyy-MM-dd"),
        "endDate": format(theEndDate, "yyyy-MM-dd"),
        "returnType": "average"
    };
    const result = await API.post(apiName, '/api/wearables', {
        body: {...requestBody}
    });
    return result?.data[0]?.value ?? 0;
}

export async function getAverageDailySteps(terraIds: any, startDate: any, endDate: any) {
    let theStartDate = startDate;
    let theEndDate = endDate;
    if (!theStartDate || !theEndDate) {
        theStartDate = new Date("1970-01-01");
        theEndDate = new Date();
    }
    let requestBody = {
        "idList": terraIds,
        "grouping": "user",
        "category": "daily",
        "subtype": "steps",
        "period": "millennium",
        "startDate": format(theStartDate, "yyyy-MM-dd"),
        "endDate": format(theEndDate, "yyyy-MM-dd"),
        "returnType": "average"
    };
    const result = await API.post(apiName, '/api/wearables', {
        body: {...requestBody}
    });
    return result?.data ?? [];
}
