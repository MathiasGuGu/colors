<script lang="ts">
	import ColorPicker from './colorPicker.svelte';
	import { cn } from '$lib/utils';
	import { Lock, Unlock } from 'lucide-svelte';
	enum SIZE {
		XS = 'xs',
		SMALL = 'small',
		MEDIUM = 'medium',
		LARGE = 'large'
	}

	export let backgroundColor: any;
	export let color: any;
	export let index: any;
	export let size: SIZE = SIZE.MEDIUM;
	export let lock: boolean;
</script>

<button
	class={cn(
		'px-2 py-2 flex flex-col justify-between relative duration-300 ',
		{
			'w-3 h-28': size === SIZE.XS,
			'w-28 h-28': size === SIZE.SMALL,
			'w-36 h-28': size === SIZE.MEDIUM,
			'w-56 h-28': size === SIZE.LARGE
		},
		{
			rounded: size === SIZE.XS,
			'rounded-lg': size === SIZE.SMALL,
			'rounded-md': size === SIZE.MEDIUM,
			'rounded-xl': size === SIZE.LARGE
		}
	)}
	style={`background-color: ${backgroundColor}; color: ${color}`}
>
	<div
		class={cn({
			['hidden rounded-md font-light w-fit text-sm px-2 py-1 bg-opacity-30']: true,
			flex: size === 'medium' || size === 'large'
		})}
	>
		<slot />
	</div>
	<div
		class={cn({
			['hidden  rounded-md font-light text-sm   px-2 py-1 bg-opacity-30']: true,
			flex: size === 'medium' || size === 'large'
		})}
	>
		{index}
	</div>

	<button
		on:click={() => {
			lock = !lock;
		}}
		class="w-6 h-6 z-30 flex items-center justify-center bg-black bg-opacity-20 absolute top-2 right-4 rounded"
	>
		{#if lock}
			<Lock size={16} strokeWidth={2} />
		{/if}
		{#if !lock}
			<Unlock size={16} strokeWidth={2} />
		{/if}
	</button>
</button>
