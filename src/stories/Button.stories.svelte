<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Add from 'carbon-components-svelte/src/icons/Add.svelte';
</script>

<Meta
	title="Button"
	component={Button}
	argTypes={{
		kind: {
			control: { type: 'select' },
			options: [
				'primary',
				'secondary',
				'tertiary',
				'ghost',
				'danger',
				'danger-tertiary',
				'danger-ghost'
			],
			description: 'Specify the kind of button',
      		defaultValue: 'primary'
		},
		size: {
			control: { type: 'select' },
			options: ['default', 'field', 'small', 'lg', 'xl'],
			description: 'Specify the size of the button',
     		defaultValue: 'default'
		},
		expressive: {
			control: 'boolean',
			description: "Set to true to use Carbon's expressive typesetting"
		},
		isSelected: {
			control: 'boolean',
			if: { arg: 'kind', eq: 'ghost' },
			description: 'Set to true to enable the selected state for an icon-only, ghost button'
		},
		icon: {
			control: 'text',
			description: 'Specify the icon to render, this should be a Svelte component'
		},
		iconDescription: {
			control: 'text',
			description:
				'Specify the ARIA label for the button icon. This will also be used for the tooltip'
		},
		tooltipAlignment: {
			control: { type: 'select' },
			options: ['start', 'center', 'end'],
			description:
				'Set the alignment of the tooltip relative to the icon. Only applies to icon-only buttons'
		},
		tooltipPosition: {
			control: { type: 'select' },
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Set the position of the tooltip relative to the icon'
		},
		as: {
			control: 'boolean',
			description:
				'Set to true to render a custom HTML element. Props are destructured as props in the default slot'
		},
		skeleton: {
			control: 'boolean',
			description: "Set to true to display the skeleton state."
		},
		disabled: {
			control: 'boolean',
			description: 'Set to true to disable the button'
		},
		href: {
			control: 'text',
			description: "Set the href to use an anchor link"
		},
		tabindex: {
			control: 'number',
			description: 'Specify the tabindex'
		},
		type: {
			control: 'text',
			description: 'Specify the type attribute for the button element'
		},
		ref: {
			control: null,
			description: 'A reference to the component itself'
		}
	}}
/>

<Template let:args>
	{#if args.textContent && args.textContent.length > 0}
		<Button {...args} icon={args.icon ? Add : undefined}>
			{args.textContent}
		</Button>
	{:else}
		<Button {...args} icon={args.icon ? Add : undefined} />
	{/if}
</Template>

<Story let:args name="Default">
	<Button {...args}>Hi, I'm a button</Button>
</Story>

<Story
	name="As Anchor"
	let:args
	parameters={{
		controls: {
			include: ['kind', 'size', 'disabled', 'expressive', 'icon']
		}
	}}>
	<Button href='#' {...args}>Hi, I'm an anchor</Button>
</Story>

<Story
	let:args
	name="With Icon"
	parameters={{
		controls: {
			include: ['textContent', 'kind', 'size', 'disabled', 'expressive', 'iconDescription']
		}
	}}
>
	<Button {...args} icon={Add}>Hi, I'm a button</Button>
</Story>

<Story
	name="Icon Only"
	args={{
		icon: true,
		textContent: undefined,
		iconDescription: 'Click me to add!',
		tooltipPosition: 'right',
		tooltipAlignment: 'start'
	}}
	parameters={{
		controls: {
			include: [
				'kind',
				'size',
				'disabled',
				'expressive',
				'iconDescription',
				'tooltipPosition',
				'tooltipAlignment'
			]
		}
	}}
/>

<Story 
	name="Skeleton" 
	args={{ skeleton: true }} 
	parameters={{
		controls: {
			include: ['size', 'skeleton']
		}
	}}
/>
