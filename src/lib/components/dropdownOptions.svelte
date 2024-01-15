<script lang="ts">
	import { cn } from '$lib/utils';
	import { Sparkle, ChevronDown, ChevronUp } from 'lucide-svelte';

	let isOpen = true;

	interface dropdownOption {
		id: string;
		value: string;
		function: Function;
		selected: boolean;
	}

	export let options: dropdownOption[];
	export let size: any = 'md';
	export let selected: any = null;
	export let label: any = 'Palette style';

	let handleOptionChange = (option: dropdownOption) => {
		option.function();
		isOpen = false;
	};
</script>

<div class="w-auto h-auto flex flex-col items-center justify-start relative">
	<button
		on:click={() => {
			isOpen = !isOpen;
		}}
		class={cn({
			'bg-white-50 text-white-500 border-white-100 border-[1px] rounded-lg text-sm font-light px-3 py-2 hover:bg-white-100 duration-200 flex items-center justify-center': true
		})}
	>
		{#if selected}
			{selected}
			{#if isOpen}
				<ChevronUp size={16} class="ml-2" />
			{/if}
			{#if !isOpen}
				<ChevronDown size={16} class="ml-2" />
			{/if}
		{:else}
			{label}
			{#if isOpen}
				<ChevronUp size={16} class="ml-2" />
			{/if}
			{#if !isOpen}
				<ChevronDown size={16} class="ml-2" />
			{/if}
		{/if}
	</button>
	{#if isOpen}
		<div
			class="w-72 h-80 rounded-lg shadow-lg bg-white-50 z-40 border-[1px] border-white-100 absolute top-10"
		>
			{#each options as option, i}
				<button
					on:click={() => {
						selected = option.value;
						handleOptionChange(option);
					}}
					class={cn({
						'w-full h-10 flex items-center gap-2 text-white-500 justify-start px-3 py-2 hover:bg-white-100 duration-200': true,
						'bg-white-100': option.selected,
						'bg-white-50': !option.selected,
						'rounded-t': i === 0
					})}
				>
					{option.value}
					{#if option.value !== 'random'}
						<Sparkle size={16} class="text-purple-600" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
