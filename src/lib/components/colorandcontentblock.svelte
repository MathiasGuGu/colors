<script lang="ts">
	import { Lock, Unlock, MinusCircle, XCircle, CheckCircle } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import chroma from 'chroma-js';
	interface colorContent {
		dark: string;
		darker: string;
		darkest: string;
	}

	export let lock: boolean = false;
	export let name: string;
	export let primary: string;
	export let content: colorContent;
	let WCAG: string;
	let contrast: number;
	$: {
		if (primary && content) {
			contrast = chroma.contrast(primary, content.darkest);
			WCAG = contrast >= 4.5 ? 'AAA' : contrast >= 3 ? 'AA' : 'Fail';
		}
	}
</script>

<div class="flex flex-col w-auto h-auto gap-5">
	<!-- COLOR -->
	<div
		class="w-48 h-24 rounded-lg text-xs font-light flex flex-col items-start justify-between px-2 py-3 relative"
		style={`background-color: ${primary}; color: ${content.darkest}`}
	>
		<p>{name}</p>
		<p>{primary}</p>

		<button
			class="absolute top-2 right-3 w-6 h-6 flex items-center justify-center hover:bg-black hover:bg-opacity-10 rounded-lg"
		>
			{#if lock}
				<Unlock size={16} />
			{:else}
				<Lock size={16} />
			{/if}
		</button>
		<button class="text-xs bottom-2 right-4 absolute peer">
			{#if WCAG === 'Fail'}
				<XCircle size={16} />
			{/if}
			{#if WCAG === 'AA'}
				<MinusCircle size={16} />
			{/if}
			{#if WCAG === 'AAA'}
				<CheckCircle size={16} />
			{/if}
		</button>
		<div
			class={cn({
				'absolute hidden -right-4 bottom-8 z-40 h-14 w-20 rounded-lg font-bold peer-hover:flex items-center justify-center': true,
				'bg-red-500 text-red-50': WCAG === 'Fail',
				'bg-yellow-500 text-yellow-950': WCAG === 'AA',
				'bg-green-500 text-green-50': WCAG === 'AAA'
			})}
		>
			{contrast.toFixed(1)}
			{WCAG}
		</div>
	</div>

	<!-- CONTENT -->
	<div class="w-auto h-auto flex flex-col gap-3">
		<h3>{name} Content (3)</h3>
		<div class="w-48 h-24 rounded-lg flex">
			<div class="w-1/3 h-full rounded-l-lg" style={`background-color: ${content.dark}`}></div>
			<div class="w-1/3 h-full" style={`background-color: ${content.darker}`}></div>
			<div class="w-1/3 h-full rounded-r-lg" style={`background-color: ${content.darkest}`}></div>
		</div>
	</div>
</div>
