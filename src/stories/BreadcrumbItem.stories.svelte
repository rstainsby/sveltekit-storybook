<script lang='ts'>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { BreadcrumbItem } from 'carbon-components-svelte';
    import 'carbon-components-svelte/css/all.css';
</script>

<Meta
  title="Carbon Design/BreadcrumbItem"
  component={BreadcrumbItem}
  argTypes={{
    href: {
      control: 'text',
      description: "Set the href to use an anchor link",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: 'undefined' },
      }
    },
    isCurrentPage: {
      control: 'boolean',
      description: "Set to true if the breadcrumb item represents the current page",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false },
      }
    },
  }}
/>

<Template let:args>
  <BreadcrumbItem {...args}>Breadcrumb Item</BreadcrumbItem>
</Template>

<Story name="Default" args={{ href: '#' }} />
<Story name="Current Page" args={{ href: '#', isCurrentPage: true }} />