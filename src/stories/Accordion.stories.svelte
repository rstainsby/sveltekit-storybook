<script>
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import { Accordion, AccordionItem } from "carbon-components-svelte";
    import 'carbon-components-svelte/css/all.css';
  </script>
  
  <Meta
    title="Carbon Design/Accordion"
    component={Accordion}
    argTypes={{
      align: {
        control: 'select',
        options: ["start", "end"],
        required: false,
        description:
          "Specify alignment of accordion item chevron icon. One of 'start', 'end'",
        table: {
          type: { summary: "start | end" },
          defaultValue: { summary: "'end'" },
        },
      },
      size: {
        control: 'select',
        options: ["sm", "xl"],
        required: false,
        description: "The size of the accordion. One of 'sm' or 'xl'",
        table: {
          type: { summary: "sm | xl" },
          defaultValue: { summary: undefined },
        }
      },
      disabled: {
        type: 'boolean',
        required: false,
        description: "Whether the accordion is disabled",
        table: {
          type: { summary: "boolean" },
          defaultValue: { summary: false },
        },
        control: { type: "boolean" },
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
  
  <Template let:args>
    <Accordion {...args}>
      <AccordionItem title="Section 1">Content for section 1</AccordionItem>
      <AccordionItem title="Section 2">Content for section 2</AccordionItem>
      <AccordionItem title="Section 3">Content for section 3</AccordionItem>
    </Accordion>
  </Template>
  
  <Story name="Default" />
  <Story name="Disabled" args={{ disabled: true }} />
  <Story name="Left-aligned" args={{ align: "start" }} />
  <Story name="Skeleton" args={{ skeleton: true }} />