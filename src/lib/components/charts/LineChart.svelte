<script lang='ts'>
    import * as am5 from "@amcharts/amcharts5";
    import * as am5xy from "@amcharts/amcharts5/xy";
    import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
	import { onMount } from "svelte";
	import { onDestroy } from "svelte";

    export let chartId: string;

    export let data: {
        date: number;
        value: number;
    }[];

    let root: am5.Root;

    onMount(() => {
        root = am5.Root.new(chartId);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none"
        }));

        cursor.lineY.set("visible", false);


        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.2,
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
            orientation: "horizontal"
        }));

        // Set data
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    })

    onDestroy(() => {
        root.dispose();
    })
</script>

<div id='{chartId}' class="chart"></div>

<style>
    .chart {
        width: 100%;
        height: 500px;
    }
</style>