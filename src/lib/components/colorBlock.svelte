<script lang="ts">
	import ColorPicker from './colorPicker.svelte';

	export let backgroundColor: any;
	export let color: any;
	export let currentPickingColor: string;

	let isColorPickerOpen = false;
</script>

{#if isColorPickerOpen}
	<ColorPicker bind:color bind:isOpen={isColorPickerOpen} />
{/if}
<button
	on:click={() => {
		currentPickingColor = 'primary';
		isColorPickerOpen = true;
	}}
	class="flex w-32 h-full rounded-lg hover:cursor-pointer items-center justify-center font-light"
	style={`background-color: ${backgroundColor};
			color: ${color}`}
>
	<slot />
</button>
