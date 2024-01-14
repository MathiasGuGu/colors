import chroma from 'chroma-js';
import {
	generateRandomTheme,
	type ColorPalette,
	type Color,
	type ColorVarient
} from './ColorsInterface';

import { ColorExportType } from './ColorsInterface';

const constructTailwindColorString = (
	color: Color | ColorVarient,
	option: string,
	name: string
) => {
	let string = '';

	for (const [key, value] of Object.entries(color)) {
		switch (option) {
			case ColorExportType.hex:
				string += `--${name}-${key}: ${chroma(value).hex()},
                `;
				break;
			case ColorExportType.rgb:
				string += `--${name}-${key}: rgb(${chroma(value).rgb()}),
                `;
				break;
			case ColorExportType.hsl:
				string += `--${name}-${key}: hsl(${chroma(value).hsl()}),
                `;
				break;
			default:
				string += `--${name}-${key}: ${chroma(value).hex()},
                `;
				break;
		}
	}

	return string;
};

export const constructCSSExport = (color: ColorPalette, option: string = 'hsl') => {
	let content = `root: {

    `;

	let PrimaryString;
	let PrimaryContentString;
	let SecondaryString;
	let SecondaryContentString;
	let TertiaryString;
	let TertiaryContentString;
	if (color.primary) {
		PrimaryString = constructTailwindColorString(color.primary, option, 'primary');
		PrimaryContentString = constructTailwindColorString(
			color.primaryContent,
			option,
			'primaryContent'
		);
		content += PrimaryString;
		content += PrimaryContentString;
	}
	if (color.secondary) {
		SecondaryString = constructTailwindColorString(color.secondary, option, 'secondary');
		SecondaryContentString = constructTailwindColorString(
			color.secondaryContent,
			option,
			'secondaryContent'
		);
		content += SecondaryString;
		content += SecondaryContentString;
	}
	if (color.tertiary) {
		TertiaryString = constructTailwindColorString(color.tertiary, option, 'tertiary');

		TertiaryContentString = constructTailwindColorString(
			color.tertiaryContent,
			option,
			'tertiaryContent'
		);
		content += TertiaryString;
		content += TertiaryContentString;
	}

	content += `}`;

	return content;
};
