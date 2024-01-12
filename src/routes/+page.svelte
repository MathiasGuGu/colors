<script lang="ts">
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
			<div
				class="h-full aspect-[3/1] rounded-lg border border-zinc-200 flex items-center justify-center"
			>
				Dashboard
			</div>
			<div
				class="h-full aspect-[3/1] rounded-lg border border-zinc-200 flex items-center justify-center"
			>
				E-commerce
			</div>
			<div
				class="h-full aspect-[3/1] rounded-lg border border-zinc-200 flex items-center justify-center"
			>
				Blog
			</div>
			<div
				class="h-full aspect-[3/1] rounded-lg border border-zinc-200 flex items-center justify-center"
			>
				Portfolio
			</div>
		</div>
	</div>
</section>

<section class="w-screen h-auto flex items-center justify-center mt-12 mb-32">
	<div
		class="w-screen max-w-7xl h-auto border rounded-t-lg shadow-2xl shadow-zinc-50 flex flex-col"
		style={`
        background-color: ${backgroundColor}
    `}
	>
		<!-- start of navbar-->

		<div
			class="flex w-full h-12 rounded-t-lg text-sm items-center justify-between px-12"
			style={`color: ${colors.textColor.darkest}`}
		>
			<div>Dashboard</div>
			<div class="flex gap-4 items-center text-xs">
				<p>Dashboard</p>
				<p>Information</p>
				<p>Contact</p>
				<Bell strokeWidth={2} size={16} />
				<MessageCircleCode strokeWidth={2} size={16} />
				<div class="h-8 w-8 rounded-full" style={`background-color: ${colors.primary}`}></div>
			</div>
		</div>
		<!-- start of dashboard-->
		<div class="w-full h-auto flex">
			<!-- start of sidebar-->
			<div class="w-1/5 h-auto flex flex-col items-start justify-start py-6 px-6 gap-5 border-r">
				<p class="flex gap-2 items-center" style={`color: ${colors.textColor.darkest};`}>
					<Package strokeWidth={2} size={16} /> Deliveries
				</p>
				<div
					class="flex flex-col pl-5 gap-2 text-sm"
					style={`
                        color: ${colors.textColor.darkest}
                    `}
				>
					<p
						class="flex items-center gap-2 rounded-lg px-2 py-1"
						style={`background-color: ${colors.primary}; color: ${colors.primaryContent.darkest}`}
					>
						<CornerDownRight strokeWidth={1} size={16} /> Recent deliveries
					</p>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} /> All deliveries
					</p>
				</div>
				<p class="flex gap-2 items-center" style={`color: ${colors.textColor.darkest};`}>
					<GitGraph strokeWidth={2} size={16} /> Statistics
				</p>
				<div class="flex flex-col pl-5 gap-2 text-sm" style={`color: ${colors.textColor.darkest};`}>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} /> Client Statistics
					</p>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} /> All statistics
					</p>
				</div>
				<p class="flex items-center gap-2" style={`color: ${colors.textColor.darkest};`}>
					<Info strokeWidth={2} size={16} /> Other
				</p>
				<div class="flex flex-col pl-5 gap-2 text-sm" style={`color: ${colors.textColor.darkest};`}>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} />Account
					</p>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} />Settings
					</p>
					<p class="flex items-center gap-2">
						<CornerDownRight strokeWidth={1} size={16} />Terms of Service
					</p>
				</div>
				<div class="w-full h-64"></div>
				<!--End of sidebar-->
			</div>

			<!-- start of dashboard-->
			<div class="w-4/5 flex flex-col px-6 py-4">
				<div class="flex h-72 w-full gap-1">
					<div
						class="flex-1 h-full border rounded-lg flex px-6 py-4 flex-col gap-2 duration-300"
						style={`background-color: ${colors.primary}`}
					>
						<p style={`color: ${colors.primaryContent.darkest}`} class="text-2xl font-light">
							All your statistics in one Place
						</p>
						<div class="flex gap-1 items-center">
							<p
								style={`color: ${colors.primaryContent.dark}`}
								class="text-sm font-light flex items-center gap-1"
							>
								Something <ArrowRight strokeWidth={1} size={16} />
							</p>
							<p
								style={`color: ${colors.primaryContent.darker}`}
								class="text-sm font-light flex items-center gap-1"
							>
								Something more <ArrowRight strokeWidth={1} size={16} />
							</p>
							<p
								style={`color: ${colors.primaryContent.darkest}`}
								class="text-sm font-light flex items-center gap-1"
							>
								Something most
							</p>
						</div>
						<p
							style={`color: ${colors.primaryContent.darker}`}
							class="text-sm font-light duration-300"
						>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem itaque voluptatibus quae
							deserunt maxime fuga cum autem ea ad voluptas. Lorem, ipsum dolor sit amet consectetur
							adipisicing elit. At minima explicabo libero quisquam labore, corporis quibusdam
							voluptate illo itaque totam!
						</p>
					</div>
					<div
						class="flex-1 h-full border rounded-lg duration-300"
						style={`background-color: ${colors.secondary}`}
					></div>
				</div>
				<div class="w-full h-auto flex flex-col py-12 gap-1">
					<h2 class="text-xl font-light" style={`color: ${colors.textColor.darkest}`}>
						View all recent deliveries
					</h2>
					<p class="text-base font-light -mt-2" style={`color: ${colors.textColor.darker}`}>
						See all your latest deliveries and services in one place.
					</p>
					<div
						class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
						style={`background-color: ${chroma(backgroundColor).darken(0.2).hex()}; color: ${
							colors.foregroundText.darkest
						}`}
					>
						<p>First order</p>
						<div
							style={`background-color: ${colors.toastInfo}; color: ${colors.toastColors.info.content.darkest}`}
							class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
						>
							Undergoing
						</div>
						<div>
							{new Date().toDateString()}
						</div>
						<div>Figma workfile</div>
					</div>
					<div
						class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
						style={`background-color: ${chroma(backgroundColor).brighten(1).hex()}; color: ${
							colors.foregroundText.darkest
						}`}
					>
						<p>Second order</p>
						<div
							style={`background-color: ${colors.toastSuccess}; color: ${colors.toastColors.success.content.darkest}`}
							class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
						>
							Successfull
						</div>
						<div>
							{new Date().toDateString()}
						</div>
						<div>Figma workfile</div>
					</div>
					<div
						class="w-full h-14 rounded-lg flex gap-3 items-center px-12 text-sm justify-between"
						style={`background-color: ${chroma(backgroundColor).brighten(1).hex()}; color: ${
							colors.foregroundText.darkest
						}`}
					>
						<p>Second order</p>
						<div
							style={`background-color: ${colors.toastWarning}; color: ${colors.toastColors.warning.content.darkest}`}
							class="h-6 text-xs rounded-lg flex items-center justify-center w-auto px-2"
						>
							Danger
						</div>
						<div>
							{new Date().toDateString()}
						</div>
						<div>Figma workfile</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End of page-->
	</div>
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
