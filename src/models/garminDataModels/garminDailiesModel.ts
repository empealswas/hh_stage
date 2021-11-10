export class GarminDailiesSummaryModel {
    constructor(
        public period: Date,
        public garminId: string,
        public summaryId: string,
        public totalSteps: number,
        public stepDuration: number,
        public vigorousIntensity: number,
        public moderateIntensity: number
    ){}
}
