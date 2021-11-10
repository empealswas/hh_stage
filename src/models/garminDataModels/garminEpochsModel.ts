export class GarminEpochsSummaryDataModel {
    constructor(
        public period: Date,
        public garminId: string,
        public summaryId: string,
        public active: number,
        public duration: number,
        public highlyActive: number,
        public sedentary: number,
    ) { }
}