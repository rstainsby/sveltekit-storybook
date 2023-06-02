<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
    import LineChart from "$lib/components/charts/LineChart.svelte";
	import { generateDatas } from '$lib/components/charts/data';
	import StreamableLineChart from '$lib/components/charts/StreamableLineChart.svelte';

    let addDataPoint: (arg0: { date: number; value: number; }) => void;

    const secondData = generateDatas(1000, 'second');

    let initialSecondData = secondData.slice(0, 50);

    let dataStream: {
        date: number,
        value: number
    };

    let i = 50;
    const timeout = setInterval(() => {
        dataStream = secondData[i];
        i++;
    }, 1000);
    
    const dailyData = generateDatas(365);
</script>

<Meta title="Charts/LineChart" component={LineChart} />

<Template let:args>
    <LineChart {...args}  data={dailyData} />
</Template>

<Story name="Static">
    <LineChart chartId='{(Math.random() + 1).toString(36).substring(7)}}-chart' data={dailyData}/>
</Story>

<Story name="Streamed">
    <StreamableLineChart chartId='streamed-chart' bind:data={initialSecondData} newDataPoint={dataStream}/>
</Story>