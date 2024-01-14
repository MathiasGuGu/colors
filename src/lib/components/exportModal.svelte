<script lang="ts">
	import { constructTailwindExport } from '$lib/constructors/TailwindExportContructor';
	import { constructCSSExport } from '$lib/constructors/CSSExportConstructor';
	import { generateRandomTheme } from '$lib/constructors/ColorsInterface';
	import { ColorExportType, ColorExportFormat } from '$lib/constructors/ColorsInterface';
	import { X } from 'lucide-svelte';

	export let isModalOpen = true;
	export let ColorPalette;

	console.log(ColorPalette);

	let exportString = '';
	let exportMode = ColorExportFormat.css;
	let exportType: ColorExportType = ColorExportType.hex;

	$: if (exportMode === ColorExportFormat.css) {
		exportString = constructCSSExport(ColorPalette, exportType);
	} else if (exportMode === ColorExportFormat.tailwind) {
		exportString = constructTailwindExport(ColorPalette, exportType);
	}
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
				<button
					on:click={() => {
						exportMode = ColorExportFormat.css;
					}}
					class="h-full w-auto px-6 rounded-tl-lg hover:bg-white-100 duration-200"
					>CSS Variables</button
				>
				<button
					on:click={() => {
						exportMode = ColorExportFormat.tailwind;
					}}
					class="h-full w-auto px-6 hover:bg-white-100 duration-200">TailwindCSS</button
				>
				<button class="h-full w-auto px-6 hover:bg-white-100 duration-200">Color Scales</button>
			</div>
			<div
				class="w-full h-10 overflow-scroll border-b rounded-t-lg flex items-center pr-4 justify-start text-sm font-light"
			>
				<button
					on:click={() => {
						exportType = ColorExportType.hex;
					}}
					class="h-full w-auto px-6 rounded-tl-lg hover:bg-white-100 duration-200">HEX</button
				>
				<button
					on:click={() => {
						exportType = ColorExportType.rgb;
					}}
					class="h-full w-auto px-6 hover:bg-white-100 duration-200">RGB</button
				>
				<button
					on:click={() => {
						exportType = ColorExportType.hsl;
					}}
					class="h-full w-auto px-6 hover:bg-white-100 duration-200">HSL</button
				>
			</div>
			<!--END Export Options-->
			<div class="w-full h-auto flex flex-col px-3 py-3">
				<div class="bg-white-100 px-4 py-2 border-white-200 border-b-[1px]">
					{#if exportMode === ColorExportFormat.css}
						<p class="text-xs font-light">style.css</p>
					{:else if exportMode === ColorExportFormat.tailwind}
						<p class="text-xs font-light">Tailwind.config.js</p>
					{/if}
				</div>
				<code class="w-full h-auto text-sm font-thin bg-white-100 rounded-b-lg overflow-scroll">
					<pre>{exportString}</pre>
				</code>
			</div>
		</div>
		<!--END MODAL-->
	</div>
{/if}
