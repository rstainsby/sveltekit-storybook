<script lang='ts'>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton, OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
  import 'carbon-components-svelte/css/all.css';
</script>

<Meta
  title="Carbon Design/Breadcrumb"
  component={Breadcrumb}
  subcomponents={{ BreadcrumbItem, BreadcrumbSkeleton }}
  argTypes={{
    noTrailingSlash: {
      control: 'boolean',
      required: false,
      description: "Set to true to remove the final slash of the breadcrumb",
        table: {
          type: { summary: "boolean" },
          defaultValue: { summary: false },
        }
    },
    skeleton: {
        type: 'boolean',
        required: false,
        description: "Show a loading skeleton for the component",
        table: {
          type: { summary: "boolean" },
          defaultValue: { summary: false },
        },
        control: { type: "boolean" },
      },
  }}
/>

<Template id='default' let:args>
  <Breadcrumb {...args}>
    <BreadcrumbItem href="#" >Home</BreadcrumbItem>
    <BreadcrumbItem href="#">API Documentation</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumbs</BreadcrumbItem>
  </Breadcrumb>
</Template>

<Template id='overflow' let:args>
  <Breadcrumb {...args}>
    <BreadcrumbItem href="#" >Home</BreadcrumbItem>
    <BreadcrumbItem href="#">    
      <OverflowMenu>
        <OverflowMenuItem href="/api/data" text="Data" />
        <OverflowMenuItem href="/api/data/latest" text="Latest" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumbs</BreadcrumbItem>
  </Breadcrumb>
</Template>

<Story name="Default" template='default'></Story>
<Story name="Overflow Menu" template='overflow'></Story>
<Story name="No Trailing Slash" template='default' args={{ noTrailingSlash: true }}></Story>
<Story name="Skeleton" template='default' args={{ skeleton: true }}></Story>