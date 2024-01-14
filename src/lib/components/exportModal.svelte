<script lang="ts">
	import { constructTailwindExport } from '$lib/constructors/TailwindExportContructor';
	import { generateRandomTheme } from '$lib/constructors/ColorsInterface';
	import { X } from 'lucide-svelte';

	export let isModalOpen = true;

	let exportString = constructTailwindExport(generateRandomTheme());

	console.log(exportString);
</script>

{#if isModalOpen}
	<div class="w-screen h-screen flex flex-col items-center justify-center fixed left-0 top-0">
		<div class="w-1/3 h-16 flex items-center justify-end">
			<button
				on:click={() => {
					isModalOpen = false;
				}}
				class="h-12 w-12 rounded-full bg-black/10 text-black flex items-center justify-center"
			>
				<X strokeWidth={1}></X>
			</button>
		</div>
		<!--MODAL-->
		<div
			class="w-1/3 h-2/3 bg-white-50 shadow-xl border border-white-100 z-50 rounded-lg overflow-scroll"
		>
			<!--Export Options-->
			<div
				class="w-full h-16 overflow-scroll border-b rounded-t-lg flex items-center pr-4 justify-start text-sm font-light"
			>
				<button class="h-full w-auto px-6 rounded-tl-lg hover:bg-white-100 duration-200"
					>CSS Variables</button
				>
				<button class="h-full w-auto px-6 hover:bg-white-100 duration-200">TailwindCSS</button>
				<button class="h-full w-auto px-6 hover:bg-white-100 duration-200">Color Scales</button>
			</div>
			<div
				class="w-full h-10 overflow-scroll border-b rounded-t-lg flex items-center pr-4 justify-start text-sm font-light"
			>
				<button class="h-full w-auto px-6 rounded-tl-lg hover:bg-white-100 duration-200">HEX</button
				>
				<button class="h-full w-auto px-6 hover:bg-white-100 duration-200">RGB</button>
				<button class="h-full w-auto px-6 hover:bg-white-100 duration-200">HSL</button>
			</div>
			<!--END Export Options-->
			<div class="w-full h-auto flex flex-col px-3 py-6">
				<pre class="w-full h-auto text-sm font-thin">
                    {exportString}
                </pre>
			</div>
		</div>
		<!--END MODAL-->
	</div>
{/if}
