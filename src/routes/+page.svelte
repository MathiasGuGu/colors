<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import ColorBlock from '$lib/components/colorBlock.svelte';
	import ColorPicker from '$lib/components/colorPicker.svelte';
	import chroma from 'chroma-js';

	import {
		ArrowRight,
		Bell,
		CornerDownRight,
		Dices,
		GitGraph,
		Info,
		LockIcon,
		MessageCircleCode,
		Package,
		Share2
	} from 'lucide-svelte';
	import { scale } from 'svelte/transition';

	let isColorPickerOpen = false;

	let locks = {
		primary: false,
		secondary: false,
		primaryContent: false,
		secondaryContent: false,
		background: false,
		foreground: false,
		toast: {
			warning: false,
			success: false,
			info: false
		}
	};
	let colors: any = {};
	let currentExample = 'dashboard';
	let currentPickingColor = 'primary';

	let backgroundColor = '#f5f5f5';
	let primaryColorScale: string[];
	let secondaryColorScale: string[];
	let accentColorScale: string[];
	let getColorScale = (color: string) => {
		let lightest = lightestInScale(color);
		let darkest = darkestInScale(color);

		let start = chroma.scale([lightest, color]).mode('lch').colors(5);
		let end = chroma.scale([color, darkest]).mode('lch').colors(5);

		let colorScale = [...start, ...end];

		// remove element at index 5
		colorScale.splice(5, 1);

		return colorScale;
	};

	let lightestInScale = (color: string) => {
		let c = chroma(color).brighten(2.5).hex();
		return c;
	};

	let darkestInScale = (color: string) => {
		let c = chroma(color).darken(3).hex();
		return c;
	};

	let getWarningColor = (color: string = 'green', primary: string) => {
		let c = chroma(color).set('hsl.l', chroma(primaryColorScale[3]).get('hsl.l'));
		return c;
	};

	let getColorVarients = (color: string) => {
		// check if color is light or dark
		let darkest =
			chroma.contrast(color, backgroundColor) > 4.5
				? chroma(color).brighten(5).hex()
				: chroma(color).darken(4).hex();
		let darker =
			chroma.contrast(color, backgroundColor) > 4.5
				? chroma(color).brighten(3).hex()
				: chroma(color).darken(2).hex();
		let dark =
			chroma.contrast(color, backgroundColor) > 4.5
				? chroma(color).brighten(2).hex()
				: chroma(color).darken(1).hex();

		// TODO: make sure the "darkest" color is always the darkest of the three

		return {
			darkest: darkest,
			darker: darker,
			dark: dark
		};
	};

	// TODO: create calculate content color funciton
	let calculateContentColor = (color: string) => {
		colors.primaryContent = getColorVarients(color);
	};
	$: {
		calculateContentColor(colors.primary);
		colors.primaryColorScale = getColorScale(colors.primary);
		colors.secondaryColorScale = getColorScale(colors.secondary);
	}

	let randomizeColors = () => {
		let primary: string = colors.primary;
		let secondary: string = colors.secondary;

		if (!colors.primary) {
			primary = chroma.random().hex();
		}

		if (!locks.primary) {
			primary = chroma.random().hex();
		}

		if (!locks.secondary) {
			secondary = chroma.random().hex();
		}

		if (!locks.primary) {
			primary = chroma.random().hex();
		}

		primaryColorScale = getColorScale(primary);

		secondaryColorScale = getColorScale(secondary);

		let textColor = getColorVarients(backgroundColor);
		let foregroundText = getColorVarients(chroma(backgroundColor).brighten(1).hex());
		let primaryContent = getColorVarients(primary);
		let secondaryContent = getColorVarients(secondary);

		let warningColor = getWarningColor('red', primaryColorScale[2]);
		let warningColorScale = getColorScale(warningColor);
		let warningColorContent = getColorVarients(warningColor);

		let successColor = getWarningColor('green', primaryColorScale[2]);
		let successColorScale = getColorScale(successColor);
		let successColorContent = getColorVarients(successColor);

		let infoColor = getWarningColor('blue', primaryColorScale[2]);
		let infoColorScale = getColorScale(infoColor);
		let infoColorContent = getColorVarients(infoColor);

		return {
			primary: primary,
			secondary: secondary,
			backgroundColor: backgroundColor,
			secondaryColorScale: secondaryColorScale,
			primaryColorScale: primaryColorScale,
			toastSuccess: successColor,
			toastWarning: warningColor,
			toastInfo: infoColor,
			textColor: {
				darkest: textColor.darkest,
				darker: textColor.darker,
				dark: textColor.dark
			},
			foregroundText: {
				darkest: foregroundText.darkest,
				darker: foregroundText.darker,
				dark: foregroundText.dark
			},
			primaryContent: {
				darkest: primaryContent.darkest,
				darker: primaryContent.darker,
				dark: primaryContent.dark
			},
			secondaryContent: {
				darkest: secondaryContent.darkest,
				darker: secondaryContent.darker,
				dark: secondaryContent.dark
			},
			toastColors: {
				warning: {
					color: warningColor,
					scale: warningColorScale,
					content: warningColorContent
				},
				success: {
					color: successColor,
					scale: successColorScale,
					content: successColorContent
				},
				info: {
					color: infoColor,
					scale: infoColorScale,
					content: infoColorContent
				}
			}
		};
	};

	// TODO: Use Color Theory to generate colors

	colors = randomizeColors();
</script>

<section class="flex w-screen h-auto">
	<div class=" flex flex-1 h-1" style={`background-color: ${colors.primaryContent.dark}`}></div>
	<div class=" flex flex-1 h-1" style={`background-color: ${colors.primaryContent.darker}`}></div>
	<div class=" flex flex-1 h-1" style={`background-color: ${colors.primaryContent.darkest}`}></div>
</section>

<section class="w-screen h-auto flex items-center justify-center my-12">
	<div class="w-full max-w-7xl flex flex-col gap-4 font-light">
		<h3 class="underline">Choose an example page to view the colors</h3>
		<div class="w-full h-10 flex gap-2 text-sm">
			<label class="h-full aspect-[3/1] rounded-lg border flex items-center justify-center">
				<input
					class="w-full h-full peer hidden"
					type="radio"
					name="showcase"
					on:change={() => (currentExample = 'dashboard')}
				/>
				<div
					class="peer-checked:bg-button/20 border rounded-lg peer-checked:border-button w-full h-full flex items-center justify-center"
				>
					Dashboard
				</div>
			</label>
			<label class="h-full aspect-[3/1] rounded-lg border flex items-center justify-center">
				<input
					class="w-full h-full peer hidden"
					type="radio"
					name="showcase"
					on:change={() => (currentExample = 'ecommerce')}
				/>
				<div
					class="peer-checked:bg-button/20 border rounded-lg peer-checked:border-button w-full h-full flex items-center justify-center"
				>
					E-commerce
				</div>
			</label>
			<label class="h-full aspect-[3/1] rounded-lg border flex items-center justify-center">
				<input
					class="w-full h-full peer hidden"
					type="radio"
					name="showcase"
					on:change={() => (currentExample = 'portfolio')}
				/>
				<div
					class="peer-checked:bg-button/20 border rounded-lg peer-checked:border-button w-full h-full flex items-center justify-center"
				>
					Portfolio
				</div>
			</label>
		</div>
	</div>
</section>

<section class="w-screen h-auto flex items-center justify-center mt-12 mb-32">
	{#if currentExample === 'dashboard'}
		<Dashboard {colors} {backgroundColor} />
	{:else if currentExample === 'ecommerce'}
		<div>Not available</div>
	{:else if currentExample === 'portfolio'}
		<div>Not available</div>
	{/if}
</section>

<div
	class="fixed bottom-5 left-1/2 p-1 -translate-x-1/2 w-[95vw] rounded-lg bg-zinc-300 bg-opacity-25 backdrop-blur-lg border-zinc-200 h-[4.3rem] flex items-center gap-1"
>
	<ColorBlock
		backgroundColor={colors.primary}
		color={colors.primaryContent.darkest}
		{currentPickingColor}>Primary</ColorBlock
	>
	<ColorBlock
		backgroundColor={colors.secondary}
		color={colors.secondaryContent.darkest}
		{currentPickingColor}>Secondary</ColorBlock
	>
	<ColorBlock
		backgroundColor={colors.backgroundColor}
		color={colors.foregroundText.darkest}
		{currentPickingColor}>Background</ColorBlock
	>
	<ColorBlock
		backgroundColor={colors.textColor.darkest}
		color={colors.backgroundColor}
		{currentPickingColor}>Foreground</ColorBlock
	>
	<!--
	<ColorBlock
		backgroundColor={colors.toastColors.warning.color}
		color={colors.toastColors.warning.content.darkest}
		{currentPickingColor}>Toast Warning</ColorBlock
	>-->
	<div class="flex gap-1 h-full">
		<button
			on:click={() => {
				colors = randomizeColors();
			}}
			class="flex bg-white duration-300 gap-2 h-full aspect-square rounded text-sm items-center justify-center"
		>
			<Dices strokeWidth={2} size={24} />
		</button>
		<button
			class="flex gap-2 bg-white duration-300 h-full px-8 rounded text-sm items-center justify-center"
		>
			<Share2 strokeWidth={2} size={16} />
			Export</button
		>
	</div>
</div>
