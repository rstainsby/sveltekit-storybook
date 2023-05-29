<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import Add from 'carbon-components-svelte/src/icons/Add.svelte';
</script>

<Meta
	title="Carbon Design/Button"
	component={Button}
	argTypes={{
		kind: {
			control: 'select',
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
			table: {
				type: { summary: null },
				defaultValue: { summary: 'primary' }
			}
		},
		size: {
			control: 'select',
			options: ['default', 'field', 'small', 'lg', 'xl'],
			description: 'Specify the size of the button',
			table: {
				type: { summary: null },
				defaultValue: { summary: 'default' }
			}
		},
		expressive: {
			control: 'boolean',
			description: "Set to true to use Carbon's expressive typesetting",
			table: {
				type: { summary: null },
				defaultValue: { summary: false }
			}
		},
		isSelected: {
			control: 'boolean',
			if: { arg: 'kind', eq: 'ghost' },
			description: 'Set to true to enable the selected state for an iconOnly, ghost button',
			table: {
				type: { summary: null },
				defaultValue: { summary: false }
			}
		},
		icon: {
			control: 'text',
			description: 'Specify the icon to render, this should be a Svelte component',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		iconDescription: {
			control: 'text',
			description:
				'Specify the ARIA label for the button icon. This will also be used for the tooltip',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		tooltipAlignment: {
			control: 'select',
			options: ['start', 'center', 'end'],
			description:
				'Set the alignment of the tooltip relative to the icon. Only applies to iconOnly buttons',
			table: {
				type: { summary: null },
				defaultValue: { summary: 'start' }
			}
		},
		tooltipPosition: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Set the position of the tooltip relative to the icon',
			table: {
				type: { summary: null },
				defaultValue: { summary: 'bottom' }
			}
		},
		as: {
			control: 'boolean',
			description:
				'Set to true to render a custom HTML element. Props are destructured as props in the default slot',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		skeleton: {
			control: 'boolean',
			description: 'Set to true to display the skeleton state.',
			table: {
				type: { summary: null },
				defaultValue: { summary: false }
			}
		},
		disabled: {
			control: 'boolean',
			description: 'Set to true to disable the button',
			table: {
				type: { summary: null },
				defaultValue: { summary: false }
			}
		},
		href: {
			control: 'text',
			description: 'Set the href to use an anchor link',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		tabindex: {
			control: 'number',
			description: 'Specify the tabindex',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		type: {
			control: 'text',
			description: 'Specify the type attribute for the button element',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		},
		ref: {
			control: null,
			description: 'A reference to the component itself',
			table: {
				type: { summary: null },
				defaultValue: { summary: null }
			}
		}
	}}
/>

<Template id="withText" let:args>
	<Button {...args} icon={args.icon ? Add : undefined}>
		{args.textContent}
	</Button>
</Template>

<Template id="iconOnly" let:args>
	<Button {...args} icon={args.icon ? Add : undefined} />
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
	}}
>
	<Button href="#" {...args}>Hi, I'm an anchor</Button>
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
	template="iconOnly"
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
	template="withText"
	name="Skeleton"
	args={{ skeleton: true }}
	parameters={{
		controls: {
			include: ['size', 'skeleton']
		}
	}}
/>
