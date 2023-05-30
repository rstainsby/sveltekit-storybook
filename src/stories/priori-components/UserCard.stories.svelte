<script lang="ts">
    import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
    import UserCard from "$lib/components/UserCard.svelte";
    import johnDoeProfilePicture from './images/john-doe--profile-picture.png';
    import janeDoeProfilePicture from './images/jane-doe--profile-picture.png';
    import 'carbon-components-svelte/css/all.css';
	import { Button } from "carbon-components-svelte";
</script>
  
<Meta 
  title="Priori/UserCard" 
  component={UserCard}
  argTypes={{
      name: {
          control: 'text',
          description: 'The name of the user',
          required: true,
          table: {
              type: { summary: 'string' },
              defaultValue: { summary: 'undefined' }
          }
      },
      role: {
          control: 'text',
          description: 'The role of the user',
          required: false,
          table: {
              type: { summary: 'string' },
              defaultValue: { summary: 'undefined' }
          }
      },
      skeleton: {
          control: 'boolean',
          description: 'Set to true to enable the skeleton state for the user card',
          required: false,
          table: {
              type: { summary: 'boolean' },
              defaultValue: { summary: false }
          }
      }
  }}/>

  <Template let:args>
      <UserCard {...args}>
          <img slot="profilePicture" src="{johnDoeProfilePicture}" alt="{args.name}'s profile picture">
      </UserCard>
  </Template>

  <Story name="Default" args={{ name: 'John Doe', role: 'Developer', skeleton: false }} let:args>
      <UserCard {...args}>
          <img slot="profilePicture" src="{johnDoeProfilePicture}" alt="{args.name}'s profile picture">
      </UserCard>
  </Story>
  
  <Story name="Alternative User" args={{ name: 'Jane Doe', role: 'Designer', skeleton: false }} let:args>
      <UserCard {...args}>
          <img slot="profilePicture" src="{janeDoeProfilePicture}" alt="{args.name}'s profile picture">
      </UserCard>
  </Story>

  <Story name="Inside Ghost Button (will wrap long names)" args={{ name: 'Jane Doe', role: 'Designer', skeleton: false }} let:args>
      <Button kind="ghost" class="container">
          <UserCard {...args}>
              <img slot="profilePicture" src="{janeDoeProfilePicture}" alt="{args.name}'s profile picture">
          </UserCard>
      </Button>
  </Story>

  <Story name="No photo" args={{ name: 'John Doe', role: 'Developer', skeleton: false }} let:args>
      <UserCard {...args}></UserCard>
  </Story>

  <Story name="No role" args={{ name: 'John Doe', skeleton: false }} let:args>
      <UserCard {...args}>
          <img slot="profilePicture" src="{johnDoeProfilePicture}" alt="{args.name}'s profile picture">
      </UserCard>
  </Story>

  <Story name="Skeleton" args={{ skeleton: true }} />
