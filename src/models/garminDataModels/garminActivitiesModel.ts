export class GarminActivitiesSummaryModel {
    constructor(
        public period: Date,
        public garminId: string,
        public summaryId: string,
        public duration: number,
        public distance: number,
        public steps: number
    ) { }
}