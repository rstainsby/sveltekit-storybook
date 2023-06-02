<script lang="ts">
	import * as am5 from '@amcharts/amcharts5';
	import * as am5xy from '@amcharts/amcharts5/xy';
	import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
	import { onDestroy, onMount } from 'svelte';

	export let chartId: string;
    export let data: {
        date: number,
        value: number
    }[];

	export let newDataPoint: {
		date: number,
		value: number
	};

	$: if (newDataPoint) {
		data.push(newDataPoint);
		
		addData(newDataPoint.date, newDataPoint.value);
	}

	// export const addDataPoint = (dataPoint: {
    //     date: number,
    //     value: number
    // }) => addData(dataPoint.date, dataPoint.value);

	/* Chart code */
	// Create root element
	// https://www.amcharts.com/docs/v5/getting-started/#Root_element
	let root: am5.Root;
	let chart: am5xy.XYChart;
	let series: am5xy.LineSeries;
	let xAxis: am5xy.DateAxis<am5xy.AxisRenderer>;
	let yAxis: am5xy.ValueAxis<am5xy.AxisRenderer>;

	onMount(() => {
		root = am5.Root.new(chartId);

		// Set themes
		// https://www.amcharts.com/docs/v5/concepts/themes/
		root.setThemes([am5themes_Animated.new(root)]);

		// Create chart
		// https://www.amcharts.com/docs/v5/charts/xy-chart/
		chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				focusable: true,
				panX: true,
				panY: true,
				wheelX: 'panX',
				wheelY: 'zoomX',
				pinchZoomX: true
			})
		);

		// Create axes
		// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
		xAxis = chart.xAxes.push(
			am5xy.DateAxis.new(root, {
				maxDeviation: 0.5,
				groupData: false,
				extraMax: 0.1, // this adds some space in front
				extraMin: -0.1, // this removes some space form th beginning so that the line would not be cut off
				baseInterval: {
					timeUnit: 'second',
					count: 1
				},
				renderer: am5xy.AxisRendererX.new(root, {
					minGridDistance: 50
				}),
				tooltip: am5.Tooltip.new(root, {})
			})
		);

		yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {})
			})
		);

		// Add series
		// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
		series = chart.series.push(
			am5xy.LineSeries.new(root, {
				name: 'Series 1',
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: 'value',
				valueXField: 'date',
				tooltip: am5.Tooltip.new(root, {
					pointerOrientation: 'horizontal',
					labelText: '{valueY}'
				})
			})
		);

		// Create animating bullet by adding two circles in a bullet container and
		// animating radius and opacity of one of them.
		series.bullets.push(function (root, series, dataItem) {
			// only create sprite if bullet == true in data context
            const dataItems = series.dataItems;
			if (dataItem.uid == dataItems[dataItems.length - 1].uid) {
				let container = am5.Container.new(root, {});
				let circle0 = container.children.push(
					am5.Circle.new(root, {
						radius: 5,
						fill: am5.color(0xff0000)
					})
				);
				let circle1 = container.children.push(
					am5.Circle.new(root, {
						radius: 5,
						fill: am5.color(0xff0000)
					})
				);

				circle1.animate({
					key: 'radius',
					to: 20,
					duration: 1000,
					easing: am5.ease.out(am5.ease.cubic),
					loops: Infinity
				});
				circle1.animate({
					key: 'opacity',
					to: 0,
					from: 1,
					duration: 1000,
					easing: am5.ease.out(am5.ease.cubic),
					loops: Infinity
				});

				return am5.Bullet.new(root, {
					locationX: undefined,
					sprite: container
				});
			}
		});

		// Add cursor
		// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
		let cursor = chart.set(
			'cursor',
			am5xy.XYCursor.new(root, {
				xAxis: xAxis
			})
		);
		cursor.lineY.set('visible', false);

		// Update data every second
		// setInterval(function () {
            // const { date, value } = data[data.length - 1];

			// addData(date, value);
		// }, 1000);

		// Make stuff animate on load
		// https://www.amcharts.com/docs/v5/concepts/animations/
		chart.appear(1000, 100);

        // tell that the last data item must create bullet
        // @ts-ignore
		data[data.length - 1].bullet = true;
		series.data.setAll(data);
	});

	onDestroy(() => {
		root.dispose();
	});

	function addData(newDate: number, newValue: number) {
		let lastDataItem = series.dataItems[series.dataItems.length - 1];

		let lastValue = lastDataItem.get('valueY');

		series.data.removeIndex(0);
		series.data.push({
			date: newDate,
			value: newValue
		});

		let newDataItem = series.dataItems[series.dataItems.length - 1];
		newDataItem.animate({
			key: 'valueYWorking',
			to: newValue,
			from: lastValue,
			duration: 600,
			easing: am5.ease.linear
		});

		// use the bullet of last data item so that a new sprite is not created
		newDataItem.bullets = [];

        if (lastDataItem.bullets) {
            newDataItem.bullets[0] = lastDataItem.bullets[0];
		    newDataItem.bullets[0].get('sprite').dataItem = newDataItem;
        }

		// reset bullets
        const lastItemDataContext = lastDataItem.dataContext as {
            date: number,
            value: number,
            bullet?: boolean;
        }
		lastItemDataContext.bullet = false;
		lastDataItem.bullets = [];

		let animation = newDataItem.animate({
			key: 'locationX',
			to: 0.5,
			from: -0.5,
			duration: 600
		});
		if (animation) {
			let tooltip = xAxis.get('tooltip');
			if (tooltip && !tooltip.isHidden()) {
				animation.events.on('stopped', function () {
					xAxis.updateTooltip();
				});
			}
		}
	}
</script>

<div id={chartId} class="chartdiv" />

<style>
	.chartdiv {
		width: 100%;
		height: 500px;
	}
</style>
