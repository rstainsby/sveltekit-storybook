<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
    import LineChart from "$lib/components/charts/LineChart.svelte";
	import { generateDatas } from '$lib/components/charts/data';
	import StreamableLineChart from '$lib/components/charts/StreamableLineChart.svelte';
    
    let addDataPoint: (arg0: { date: number; value: number; }) => void;

    const secondData = generateDatas(1000, 'second');

    let streamedData = secondData.slice(0, 50);

    let i = 50;
    const timeout = setInterval(() => {
        if (addDataPoint !== undefined) {
            addDataPoint(secondData[i])
        }
        i++;
    }, 1000);
    
    const dailyData = generateDatas(365);
</script>

<Meta title="Charts/LineChart" component={LineChart} />

<Template>
    <LineChart chartId='{(Math.random() + 1).toString(36).substring(7)}-chart' data={dailyData} />
</Template>

<Story name="Default">
    <LineChart chartId='{(Math.random() + 1).toString(36).substring(7)}}-chart' data={dailyData}/>
</Story>

<Story name="Streamed">
    <StreamableLineChart chartId='streamed-chart' initialData={streamedData} bind:addDataPoint/>
</Story>