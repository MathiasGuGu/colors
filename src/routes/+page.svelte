<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import ColorBlock from '$lib/components/colorBlock.svelte';
	import Colorandcontentblock from '$lib/components/colorandcontentblock.svelte';
	import PaletteTypeButton from '$lib/components/paletteTypeButton.svelte';
	import ShowcaseTypeButton from '$lib/components/showcaseTypeButton.svelte';
	import chroma from 'chroma-js';
	import { Dices, Share2, ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-svelte';

	interface Color {
		default: string;
		'50': string;
		'100': string;
		'200': string;
		'300': string;
		'400': string;
		'500': string;
		'600': string;
		'700': string;
		'800': string;
		'900': string;
		'950': string;
	}

	interface ColorVarient {
		darkest: string;
		darker: string;
		dark: string;
	}

	interface ColorPalette {
		primary: Color;
		primaryContent: ColorVarient;
		secondary: Color;
		secondaryContent: ColorVarient;
		tertiary: Color;
		tertiaryContent: ColorVarient;
		backgroundColor: string;
		backgroundContent: ColorVarient;
		foregroundColor: string;
		foregroundContent: ColorVarient;
	}

	enum colorPaletteEnum {
		monochrome = 'monochrome',
		analogous = 'analogous',
		triadic = 'triadic',
		tetradic = 'tetradic',
		complementory = 'complementory',
		bezier = 'bezier'
	}

	enum showcaseTypeEnum {
		dashboard = 'dashboard',
		portfolio = 'portfolio',
		ecommerce = 'ecommerce'
	}

	let mode = 'dark';

	let colorPaletteStyle = colorPaletteEnum.monochrome;
	let showcaseType = showcaseTypeEnum.dashboard;
	let colors: ColorPalette | undefined = undefined;

	let currentExample = 'dashboard';
	let currentPickingColor = 'primary';

	let colorLocks = {
		primary: false,
		secondary: false,
		tertiary: false,
		background: false,
		foreground: false
	};

	// Lightens a color by 2.5
	let lightestInScale = (color: string): string => {
		let c = chroma(color).brighten(2.5).hex();
		return c;
	};

	// Darkens a color by 3
	let darkestInScale = (color: string): string => {
		let c = chroma(color).darken(3).hex();
		return c;
	};

	// Generates a color scale of 11 colors
	let getColorScale = (color: string): Color => {
		/* 
			To generate a Palette we first create a lightest and darkest point. 
			From these to points we can create a scale of 11 colors.
			We then remove the 6th element from the array to not have duplicates
		*/
		let lightest = lightestInScale(color);
		let darkest = darkestInScale(color);

		/* 
			Scale from lightest to main color
			Scale from main color to darkest
		*/
		let start = chroma.scale([lightest, color]).mode('lch').colors(6);
		let end = chroma.scale([color, darkest]).mode('lch').colors(6);

		/* 
			Combine the two scales into one array
		*/

		let colorScale = [...start, ...end];

		/*
			remove element at index 5
		*/

		colorScale.splice(5, 1);

		return {
			default: color,
			'50': colorScale[0],
			'100': colorScale[1],
			'200': colorScale[2],
			'300': colorScale[3],
			'400': colorScale[4],
			'500': colorScale[5],
			'600': colorScale[6],
			'700': colorScale[7],
			'800': colorScale[8],
			'900': colorScale[9],
			'950': colorScale[10]
		};
	};

	let getContentColors = (color: string) => {
		let isColorDark = chroma(color).luminance() < 0.5;

		let darkest = isColorDark ? chroma(color).brighten(5).hex() : chroma(color).darken(6).hex();
		let darker = isColorDark ? chroma(color).brighten(3).hex() : chroma(color).darken(4).hex();
		let dark = isColorDark ? chroma(color).brighten(2).hex() : chroma(color).darken(3).hex();

		return {
			darkest: darkest,
			darker: darker,
			dark: dark
		};
	};

	// colors = randomizeColors();

	// TODO: Use Color Theory to generate colors

	// generate a background color based on the mode
	// if the mode is dark, generate a dark background color
	// -> Dark mode generates a dark background color with a random hue and saturation
	// if the mode is light, generate a light background color
	// -> light mode generates a dark background color with a random hue and saturation

	let generateBackgroundColor = (mode: string) => {
		let color = chroma.random().hex();
		let newColor;
		if (mode === 'dark') {
			newColor = chroma(color).set('hsl.l', 0.08).hex();
		}
		if (mode === 'light') {
			newColor = chroma(color).set('hsl.l', 0.97).hex();
		}

		return newColor;
	};

	$: backgroundColor = generateBackgroundColor(mode);
	$: backgroundContent = getContentColors(backgroundColor);

	// Generates a random color palette based on Monochrome colors
	let generateMonochromeColors = () => {
		// takes a random color and creates a monochrome scale
		let color = chroma.random().hex();
		let colorScale = getColorScale(color);

		return {
			primary: colorScale['500'],
			secondary: colorScale['800']
		};
	};

	enum seasonEnum {
		// Deep is a muted deep color
		deep = 'deep',
		// True is clear and high contrast
		true = 'true',
		// bright is clear and bright
		bright = 'bright'
	}

	// summer -> light cold colors
	let generateSummerColors = (variation: seasonEnum) => {};
	// winter -> dark cold colors
	let generateWinterColors = (variation: seasonEnum) => {};
	// spring -> light warm colors
	let generateSpringColors = (variation: seasonEnum) => {};
	// autumn -> dark warm colors
	let generateAutumnColors = (variation: seasonEnum) => {};

	// Generates a random color palette based on Analogous colors
	let generateAnalogousColors = () => {
		// takes a random color and creates a analogous scale
		let primary = chroma.random().hex();
		let primaryHue = chroma(primary).get('hsl.h');
		let hueIncrease = 90;
		let secondary = chroma(primary)
			.set('hsl.h', primaryHue + hueIncrease)
			.hex();
		let tertiary = chroma.mix(primary, secondary, 0.5, 'hsl');
		return {
			primary: primary,
			secondary: secondary,
			tertiary: tertiary
		};
	};
	// Generates a random color palette based on Triadic colors
	let generateTriadicColors = () => {
		// takes a random color and creates a triadic scale
		let primary = chroma.random().hex();
		let primaryHue = chroma(primary).get('hsl.h');
		let secondary = chroma(primary)
			.set('hsl.h', primaryHue + 120)
			.hex();
		let tertiary = chroma(primary)
			.set('hsl.h', primaryHue + 240)
			.hex();
		return {
			primary: primary,
			secondary: secondary,
			tertiary: tertiary
		};
	};
	// Generates a random color palette based on Tetradic colors
	let generateTetradicColors = () => {
		// takes a random color and creates a tetradic scale
		let primary = chroma.random().hex();
		let primaryHue = chroma(primary).get('hsl.h');
		let secondary = chroma(primary)
			.set('hsl.h', primaryHue + 90)
			.hex();
		let tertiary = chroma(primary)
			.set('hsl.h', primaryHue + 180)
			.hex();
		let quad = chroma(primary)
			.set('hsl.h', primaryHue + 270)
			.hex();
		return {
			primary: primary,
			secondary: secondary,
			tertiary: tertiary,
			quad: quad
		};
	};
	// Generates a random color palette based on Complementory colors
	let generateComplementoryColors = () => {
		// takes a random color and creates a complementory scale
		let primary = chroma.random().hex();
		let primaryHue = chroma(primary).get('hsl.h');
		let secondary = chroma(primary)
			.set('hsl.h', primaryHue + 180)
			.hex();

		return {
			primary: primary,
			secondary: secondary
		};
	};
	// Generates a random color palette using a bezier curve of the color wheel and selecting random points
	let generateColorsUsingBezierCurve = () => {
		// takes three random colors and creates a bezier curve
		const f = chroma.random().hex();
		const s = chroma.random().hex();
		const t = chroma.random().hex();
		let bezier = chroma.bezier([f, s, t]);
		let colors = bezier.scale().colors(3);

		return {
			primary: colors[0],
			secondary: colors[1],
			tertiary: colors[2]
		};
	};

	let c: any;

	$: {
		if (colorPaletteStyle === colorPaletteEnum.monochrome) {
			c = generateMonochromeColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.analogous) {
			c = generateAnalogousColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.triadic) {
			c = generateTriadicColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.tetradic) {
			c = generateTetradicColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.complementory) {
			c = generateComplementoryColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.bezier) {
			c = generateColorsUsingBezierCurve();
		}
	}
</script>

<section
	class="w-screen h-16 flex items-center justify-between px-6 gap-8 bg-[#f9f9f9] text-sm font-light"
>
	<p class="text-xs">Generate a random color theme! use space to generate</p>
	<div class="flex gap-2">
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.monochrome} />
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.analogous} />
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.triadic} />
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.tetradic} />
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.complementory} />
		<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.bezier} />
	</div>
	<div class="flex gap-12">
		<button
			on:click={() => {
				mode = mode === 'dark' ? 'light' : 'dark';
			}}
		>
			{#if mode === 'light'}
				<Sun size={24} strokeWidth={1} />
			{/if}
			{#if mode === 'dark'}
				<Moon size={24} strokeWidth={1} />
			{/if}
		</button>
		<button
			on:click={() => {
				colorPaletteStyle = colorPaletteEnum.monochrome;
			}}
			class="w-10 h-10 flex items-center justify-center rounded"
		>
			<Dices size={24} strokeWidth={1} />
		</button>
		<button>
			<ArrowLeft size={24} strokeWidth={1} />
		</button>
		<button>
			<ArrowRight size={24} strokeWidth={1} />
		</button>
		<button class="w-fit px-3 h-10 bg-white-100 flex items-center justify-center gap-2 rounded">
			<Share2 size={16} strokeWidth={1} /> Export
		</button>
	</div>
</section>
{#if c}
	<section class="w-full h-auto flex gap-6 py-5 font-thin px-20">
		{#if c.primary}
			<Colorandcontentblock
				name="Primary"
				primary={c.primary}
				content={getContentColors(c.primary)}
			/>
		{/if}
		{#if c.secondary}
			<Colorandcontentblock
				name="Secondary"
				primary={c.secondary}
				content={getContentColors(c.secondary)}
			/>
		{/if}
		{#if c.tertiary}
			<Colorandcontentblock
				name="Tertiary"
				primary={c.tertiary}
				content={getContentColors(c.tertiary)}
			/>
		{/if}
		{#if c.quad}
			<Colorandcontentblock name="Quad" primary={c.quad} content={getContentColors(c.quad)} />
		{/if}
		{#if backgroundColor}
			<Colorandcontentblock
				name="Background"
				primary={backgroundColor}
				content={backgroundContent}
			/>
		{/if}
	</section>
{/if}

<section class="w-full h-12 my-12 flex items-center justify-center text-sm">
	<div class="w-full h-full max-w-7xl">
		<ShowcaseTypeButton bind:showcaseType id={showcaseTypeEnum.dashboard} />
		<ShowcaseTypeButton bind:showcaseType id={showcaseTypeEnum.portfolio} />
		<ShowcaseTypeButton bind:showcaseType id={showcaseTypeEnum.ecommerce} />
	</div>
</section>

<section>
	{#if showcaseType === showcaseTypeEnum.dashboard}
		<Dashboard
			{backgroundColor}
			{backgroundContent}
			primaryColor={c.primary ? c.primary : null}
			primaryContent={getContentColors(c.primary)}
			secondaryColor={c.secondary ? c.secondary : null}
			secondaryContent={getContentColors(c.secondary)}
			tertiaryColor={c.tertiary ? c.tertiary : null}
			tertiaryContent={c.tertiary ? getContentColors(c.tertiary) : null}
			quadColor={c.quad ? c.quad : null}
			quadContent={c.quad ? getContentColors(c.quad) : null}
		/>
	{/if}
	{#if showcaseType === showcaseTypeEnum.portfolio}
		<Portfolio
			{backgroundColor}
			{backgroundContent}
			primaryColor={c.primary ? c.primary : null}
			primaryContent={getContentColors(c.primary)}
			secondaryColor={c.secondary ? c.secondary : null}
			secondaryContent={getContentColors(c.secondary)}
			tertiaryColor={c.tertiary ? c.tertiary : null}
			tertiaryContent={c.tertiary ? getContentColors(c.tertiary) : null}
			quadColor={c.quad ? c.quad : null}
			quadContent={c.quad ? getContentColors(c.quad) : null}
		/>
	{/if}
	{#if showcaseType === showcaseTypeEnum.ecommerce}{/if}
</section>
