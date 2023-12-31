
export class ApexChartsScatterSeriesModel {
    constructor(
        public series: ScatterPlotTraceModel[]
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
export class ScatterPlotTraceModel {
    constructor(
        public name: number|string|Date,
        public data: number[][]
    ) { }
}
export class BarPlotYAxisModel {
    constructor(
        public name: number|string|Date,
        public data: number[]
    ) { }
}