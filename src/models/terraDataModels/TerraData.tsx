export type TerraData = {
    status: "success" | "error",
    data: Daily[],
    type: 'daily' | 'activity' | 'sleep',
    user: {
        provider: string,
        user_id: string,
        last_webhook_update: string,
    }
}
type Daily = {
    metadata: {
        start_time: string,
        end_time: string,
    },
    distance_data: {
        steps: number,
        distance_meters: number,
    },
    active_durations_data: {
        inactivity_seconds: number,
        activity_seconds: number,
    }
}
type Sleep = {
    metadata: {
        start_time: string,
        end_time: string,
    },
    sleep_durations_data: {
        asleep: {
            duration_asleep_state: number,
            duration_light_sleep_state: number,
            duration_deep_sleep_state: number,
        },
        other: {
            duration_in_bed: number,
        }
    }
}
export type SleepData = {
    status: "success" | "error",
    data: Sleep[],
    type: 'daily' | 'activity' | 'sleep',
    user: {
        provider: string,
        user_id: string,
        last_webhook_update: string,
    }
}