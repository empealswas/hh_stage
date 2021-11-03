
export class ApexChartsScatterSeriesModel {
    constructor(
        public series: ApexChartsScatterTraceModel[]
    ) { }
}

export class ApexChartsScatterTraceModel {
    constructor(
        public name: string,
        public type: string,
        public data: number[][]
    ) { }
}

export class ApexChartsScatterDataPairModel {
    constructor(
        public xValue: number|string|Date,
        public yValue: number
    ) { }
}