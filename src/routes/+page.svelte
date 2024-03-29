<script lang="ts">
	import Dashboard from '$lib/components/Dashboard.svelte';
	import Portfolio from '$lib/components/Portfolio.svelte';
	import ColorBlock from '$lib/components/colorBlock.svelte';
	import Colorandcontentblock from '$lib/components/colorandcontentblock.svelte';
	import PaletteTypeButton from '$lib/components/paletteTypeButton.svelte';
	import ShowcaseTypeButton from '$lib/components/showcaseTypeButton.svelte';
	import DropdownOptions from '$lib/components/dropdownOptions.svelte';
	import ExportModal from '$lib/components/exportModal.svelte';
	import chroma from 'chroma-js';
	import { Dices, Share2, ArrowLeft, ArrowRight, Moon, Sun, AlertCircle } from 'lucide-svelte';
	import type { Color, ColorPalette } from '$lib/constructors/ColorsInterface';

	let color_store = [];
	let current_color_store = 0;
	let exportPalette: ColorPalette | undefined = undefined;

	enum colorPaletteEnum {
		random = 'random',
		monochrome = 'monochrome',
		analogous = 'analogous',
		triadic = 'triadic',
		tetradic = 'tetradic',
		complementory = 'complementory',
		bezier = 'bezier',
		null = ''
	}

	enum showcaseTypeEnum {
		dashboard = 'dashboard',
		portfolio = 'portfolio',
		ecommerce = 'ecommerce'
	}

	let mode = 'dark';
	let isExportModalOpen: boolean = false;
	let colorPaletteStyle = colorPaletteEnum.random;

	let showcaseType = showcaseTypeEnum.dashboard;
	let colors: ColorPalette | undefined = undefined;

	let currentExample = 'dashboard';
	let currentPickingColor = 'primary';

	let colorLocks: any = {
		primary: false,
		secondary: false,
		tertiary: false,
		quad: false,
		background: false,
		foreground: false
	};

	let c: any = {
		primary: chroma.random().hex(),
		secondary: chroma.random().hex()
	};

	let handleRandomizeColors = (mode: colorPaletteEnum) => {
		colorPaletteStyle = colorPaletteEnum.null;
		if (mode === colorPaletteStyle) {
			colorPaletteStyle = mode;
		} else {
			colorPaletteStyle = mode;
		}
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
	let generateAnalogousColors = (): any => {
		// takes a random color and creates a analogous scale
		let primary;

		// check if any color is locked

		if (colorLocks.primary) {
			primary = c.primary;
		} else {
			primary = chroma.random().hex();
		}

		// create a random hue shift between -90 and 90

		let hueIncrease = Math.floor(Math.random() * 180) - 90;

		let primaryHue = chroma(primary).get('hsl.h');
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
		let primary;

		// check if any color is locked

		if (colorLocks.primary) {
			primary = c.primary;
		} else {
			primary = chroma.random().hex();
		}
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
		let primary;

		// check if any color is locked

		if (colorLocks.primary) {
			primary = c.primary;
		} else {
			primary = chroma.random().hex();
		}
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
		let primary;

		// check if any color is locked

		if (colorLocks.primary) {
			primary = c.primary;
		} else {
			primary = chroma.random().hex();
		}
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

		let f;

		// check if any color is locked

		if (colorLocks.primary) {
			f = c.primary;
		} else {
			f = chroma.random().hex();
		}

		let s;

		// check if any color is locked

		if (colorLocks.secondary) {
			s = c.secondary;
		} else {
			s = chroma.random().hex();
		}

		let t;

		// check if any color is locked

		if (colorLocks.tertiary) {
			t = c.tertiary;
		} else {
			t = chroma.random().hex();
		}

		let bezier = chroma.bezier([f, s, t]);
		let colors = bezier.scale().colors(3);

		return {
			primary: colors[0],
			secondary: colors[1],
			tertiary: colors[2]
		};
	};

	let generateRandomColorPalette = (
		amount: number
	): { primary: string; secondary?: string; tertiary?: string; quad?: string } => {
		if (!amount) throw new Error('Amount is not defined');
		if (amount > 4) throw new Error('Amount is too high');
		if (amount < 1) throw new Error('Amount is too low');

		let colors = [];

		for (let i = 0; i < amount; i++) {
			let color = chroma.random().hex();
			colors.push(color);
		}

		let colorsName: any = {
			0: 'primary',
			1: 'secondary',
			2: 'tertiary',
			3: 'quad'
		};
		let colorsObject: any = {};

		// When looping over the array of colors, I need to check if the color currently being looped over is locked
		// If it is locked, I need to keep the old value.
		// the problem is that if it is locked, i need to push the current looping color to the next index and check again

		// PROBLEM FIXED!

		for (let color of colors) {
			if (colorLocks.primary) {
				colors[0] = c.primary;
			}
			if (colorLocks.secondary) {
				colors[1] = c.secondary;
			}
			if (colorLocks.tertiary) {
				colors[2] = c.tertiary;
			}
			if (colorLocks.quad) {
				colors[3] = c.quad;
			}
		}

		for (let i = 0; i < colors.length; i++) {
			colorsObject[colorsName[i]] = colors[i];
		}

		return colorsObject;
	};

	// TODO: Figure out how to type C correctly

	let generateColorPaletteFromColors = (): ColorPalette => {
		// create scale for every color

		if (!c.primary) {
			throw new Error('Primary color is not defined');
		}

		let Color: ColorPalette | any = {};
		let primaryScale;
		if (c.primary) {
			primaryScale = getColorScale(c.primary);
			Color.primary = primaryScale;
			Color.primaryContent = getContentColors(c.primary);
		}
		let secondaryScale;
		if (c.secondary) {
			secondaryScale = getColorScale(c.secondary);
			Color.secondary = secondaryScale;
			Color.secondaryContent = getContentColors(c.secondary);
		}

		let tertiaryScale;
		if (c.tertiary) {
			tertiaryScale = getColorScale(c.tertiary);
			Color.tertiary = tertiaryScale;
			Color.tertiaryContent = getContentColors(c.tertiary);
		}

		let quadScale;
		if (c.quad) {
			quadScale = getColorScale(c.quad);
			Color.quad = quadScale;
			Color.quadContent = getContentColors(c.quad);
		}

		Color.backgroundColor = backgroundColor;
		return Color;
	};

	/* 
	
		Handle color palettes in localstorage for users to be able to see previous color palettes. Up to three back.

	*/

	let handleSetColorPalette = () => {
		let colorPaletteSaveString = `${c.primary ? c.primary : ''}-${c.secondary ? c.secondary : ''}-${
			c.tertiary ? c.tertiary : ''
		}-${c.quad ? c.quad : ''}-${backgroundColor ? backgroundColor : ''}`;

		if (color_store.length > 5) {
			color_store.shift();
		}

		color_store.push(colorPaletteSaveString);

		current_color_store = color_store.length - 1;
	};

	enum paletteDirectionEnum {
		left = 'left',
		right = 'right',
		start = 'start'
	}

	let handleLoadColorPalette = (direction: paletteDirectionEnum) => {
		if (direction === paletteDirectionEnum.left) {
			if (current_color_store <= 0) {
				current_color_store = 0;
			} else {
				current_color_store -= 1;
			}
		}
		if (direction === paletteDirectionEnum.right) {
			if (current_color_store === color_store.length - 1) {
				current_color_store = color_store.length - 1;
			} else {
				current_color_store += 1;
			}
		}

		if (direction === paletteDirectionEnum.start) {
			current_color_store = color_store.length - 1;
		}

		if (color_store.length < 0) {
			return;
		}

		let colorPaletteSaveArray = color_store[current_color_store].split('-');

		let primary = colorPaletteSaveArray[0];
		let secondary = colorPaletteSaveArray[1];
		let tertiary = colorPaletteSaveArray[2];
		let quad = colorPaletteSaveArray[3];

		c.primary = primary;
		c.secondary = secondary;
		c.tertiary = tertiary;
		c.quad = quad;

		console.log(c);
	};

	$: {
		if (colorPaletteStyle === colorPaletteEnum.random) {
			c = generateRandomColorPalette(4);
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.monochrome) {
			c = generateMonochromeColors();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.analogous) {
			c = generateAnalogousColors();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.triadic) {
			c = generateTriadicColors();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.tetradic) {
			c = generateTetradicColors();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.complementory) {
			c = generateComplementoryColors();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
		if (colorPaletteStyle === colorPaletteEnum.bezier) {
			c = generateColorsUsingBezierCurve();
			handleSetColorPalette();
			exportPalette = generateColorPaletteFromColors();
		}
	}
</script>

<section
	class="w-screen h-16 flex items-center justify-between px-6 gap-8 bg-[#f9f9f9] text-sm font-light"
>
	<p class="text-xs">Generate a random color theme! use space to generate</p>

	<div class="flex gap-8">
		<div class="flex gap-2">
			<DropdownOptions
				options={[
					{
						id: colorPaletteEnum.random,
						value: colorPaletteEnum.random,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.random;
						},
						selected: true
					},
					{
						id: colorPaletteEnum.monochrome,
						value: colorPaletteEnum.monochrome,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.monochrome;
						},
						selected: false
					},
					{
						id: colorPaletteEnum.analogous,
						value: colorPaletteEnum.analogous,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.analogous;
						},
						selected: false
					},
					{
						id: colorPaletteEnum.triadic,
						value: colorPaletteEnum.triadic,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.triadic;
						},
						selected: false
					},

					{
						id: colorPaletteEnum.tetradic,
						value: colorPaletteEnum.tetradic,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.tetradic;
						},
						selected: false
					},
					{
						id: colorPaletteEnum.complementory,
						value: colorPaletteEnum.complementory,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.complementory;
						},
						selected: false
					},
					{
						id: colorPaletteEnum.bezier,
						value: colorPaletteEnum.bezier,
						function: () => {
							colorPaletteStyle = colorPaletteEnum.bezier;
						},
						selected: false
					}
				]}
			></DropdownOptions>

			<!--
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.monochrome} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.analogous} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.triadic} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.tetradic} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.complementory} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.bezier} />
			<PaletteTypeButton bind:colorPaletteStyle id={colorPaletteEnum.random} />
			-->
		</div>
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
			on:click={(e) => {
				handleRandomizeColors(colorPaletteStyle);
			}}
			class="w-10 h-10 flex items-center justify-center rounded"
		>
			<Dices size={24} strokeWidth={1} />
		</button>
		<button
			on:click={(e) => {
				e.preventDefault();
				handleLoadColorPalette(paletteDirectionEnum.left);
				exportPalette = generateColorPaletteFromColors();
			}}
		>
			<ArrowLeft size={24} strokeWidth={1} />
		</button>
		<button
			on:click={(e) => {
				e.preventDefault();
				handleLoadColorPalette(paletteDirectionEnum.right);
				exportPalette = generateColorPaletteFromColors();
			}}
		>
			<ArrowRight size={24} strokeWidth={1} />
		</button>
		<button
			on:click={() => {
				isExportModalOpen = true;
			}}
			class="w-fit px-3 h-10 bg-white-100 flex items-center justify-center gap-2 rounded"
		>
			<Share2 size={16} strokeWidth={1} /> Export
		</button>
	</div>
</section>

<section class="w-full h-auto flex items-center justify-center mt-12">
	{#if colorPaletteStyle !== colorPaletteEnum.random && colorPaletteStyle !== colorPaletteEnum.bezier}
		<div class="w-full h-12 flex items-center max-w-7xl text-blue-500">
			<div class="bg-blue-100 px-4 flex py-2 rounded-lg text-xs">
				<AlertCircle size={16} strokeWidth={2} class="mr-2" />
				Locking colors will have not effect as all colors are based on the primary
			</div>
		</div>
	{/if}
</section>

{#if c}
	<section class="w-full h-auto flex gap-6 py-5 font-thin px-20">
		{#if c.primary}
			<Colorandcontentblock
				bind:lock={colorLocks.primary}
				name="Primary"
				primary={c.primary}
				content={getContentColors(c.primary)}
			/>
		{/if}
		{#if c.secondary}
			<Colorandcontentblock
				bind:lock={colorLocks.secondary}
				name="Secondary"
				primary={c.secondary}
				content={getContentColors(c.secondary)}
			/>
		{/if}
		{#if c.tertiary}
			<Colorandcontentblock
				bind:lock={colorLocks.tertiary}
				name="Tertiary"
				primary={c.tertiary}
				content={getContentColors(c.tertiary)}
			/>
		{/if}
		{#if c.quad}
			<Colorandcontentblock
				bind:lock={colorLocks.quad}
				name="Quad"
				primary={c.quad}
				content={getContentColors(c.quad)}
			/>
		{/if}
		{#if backgroundColor}
			<Colorandcontentblock
				bind:lock={colorLocks.background}
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

<section class="my-12">
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
	{#if showcaseType === showcaseTypeEnum.ecommerce}
		not available yet
	{/if}
</section>

<ExportModal ColorPalette={exportPalette} bind:isModalOpen={isExportModalOpen}></ExportModal>
