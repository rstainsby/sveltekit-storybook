<script lang='ts'>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import { ButtonSet, Button } from 'carbon-components-svelte';
    import 'carbon-components-svelte/css/all.css';
</script>

<Meta 
    title="Carbon Design/ButtonSet" 
    component={ButtonSet} 
    argTypes={{
        stacked: {
            control: 'boolean',
            description: 'Set to true to stack buttons vertically',
            table: {
                type: { summary: null },
                defaultValue: { summary: false }
            }
        }
    }}
/>

<Template let:args>
    <ButtonSet {...args}>
        <Button>Button 1</Button>
        <Button kind={'secondary'}>Button 2</Button>
        <Button kind={'tertiary'}>Button 3</Button>
    </ButtonSet>
</Template>

<Story name="Horizontal" args={{ stacked: false }}></Story>

<Story name="Vertical" args={{ stacked: true }}></Story>