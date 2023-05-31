<script lang="ts">
	import { onMount } from "svelte";
    import { SkeletonPlaceholder, SkeletonText } from "carbon-components-svelte";

    export let name: string;
    export let role: string;
    export let skeleton: boolean;

    onMount(() => {
        if (!skeleton && !name) throw new Error("Name property is required for the UserCard component");
    });
</script>

{#if skeleton}
    <div class="user-card">
        {#if $$slots.profilePicture}
            <SkeletonPlaceholder style='width: 4rem; height: 4rem'/>
        {/if}

        <div class="user-card__info">
            <SkeletonText heading/>

            {#if role}
                <SkeletonText/>
            {/if}
        </div>
    </div>
{:else}
    <div class="user-card">
        {#if $$slots.profilePicture}
            <div class="user-card__profile-picture">
                <slot name="profilePicture"></slot>
            </div>
        {/if}

        <div class="user-card__info">
            <h5 class="user-card__name">{name}</h5>

            {#if role}
                <p class="user-card__role">{role}</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    * {
        box-sizing: border-box;
    }

    .user-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 100%;
    }

    .user-card__profile-picture {
        min-width: 4rem;  
        max-width: 4.5rem;  
        min-height: 4rem;  
        max-height: 4.5rem; 
        aspect-ratio: 1/1; 
    }

    :global(.user-card__profile-picture img) {
        width: 100%;
        aspect-ratio: 1/1; 
    }

    .user-card__info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 10rem;
    }

    .user-card__name {
        word-wrap: break-word;
    }

    .user-card__role {
        font-size: 0.9rem;
        font-weight: 300;
        word-wrap: break-word;
    }
</style>