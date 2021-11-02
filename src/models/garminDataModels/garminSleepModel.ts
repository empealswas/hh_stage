export class GarminSleepSummaryModel {
    constructor(
        public period: Date,
        public garminId: string,
        public summaryId: string,
        public duration: number,
        public lightSleep: number,
        public deepSleep: number
    ) { }
}