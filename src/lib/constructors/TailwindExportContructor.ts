import chroma from 'chroma-js';
import {
	generateRandomTheme,
	type ColorPalette,
	type Color,
	type ColorVarient
} from './ColorsInterface';

import { ColorExportType } from './ColorsInterface';

const constructTailwindColorString = (color: Color | ColorVarient, option: string) => {
	let string = '';

	for (const [key, value] of Object.entries(color)) {
		switch (option) {
			case ColorExportType.hex:
				string += `     ${key}: ${chroma(value).hex()},
                `;
				break;
			case ColorExportType.rgb:
				string += `     ${key}: rgb(${chroma(value).rgb()}),
                `;
				break;
			case ColorExportType.hsl:
				string += `     ${key}: hsl(${chroma(value).hsl()}),
                `;
				break;
			default:
				string += `     ${key}: ${chroma(value).hex()},
                `;
				break;
		}
	}

	return string;
};

export const constructTailwindExport = (color: ColorPalette, option: string = 'hsl') => {
	let primaryString = '';
	let secondaryString = '';
	let tertiaryString = '';
	let primaryContentString = '';
	let secondaryContentString = '';
	let tertiaryContentString = '';
	let quadString = '';
	let quadContentString = '';

	let exportString = ``;

	if (color.primary) {
		primaryString = constructTailwindColorString(color.primary, option);
		primaryContentString = constructTailwindColorString(color.primaryContent, option);

		exportString += `
            primary: {
                ${primaryString}
            },
            primaryContent: {
                ${primaryContentString}
            },
        `;
	}

	if (color.secondary) {
		secondaryString = constructTailwindColorString(color.secondary, option);
		secondaryContentString = constructTailwindColorString(color.secondaryContent, option);

		exportString += `
            secondary: {
                ${secondaryString}
            },
            secondaryContent: {
                ${secondaryContentString}
            },
        `;
	}
	if (color.tertiary) {
		tertiaryString = constructTailwindColorString(color.tertiary, option);
		tertiaryContentString = constructTailwindColorString(color.tertiaryContent, option);

		exportString += `
            tertiary: {
                ${tertiaryString}
            },
            tertiaryContent: {
                ${tertiaryContentString}
            },
        `;
	}

	if (color.quad) {
		quadString = constructTailwindColorString(color.quad, option);
		quadContentString = constructTailwindColorString(color.quadContent, option);

		exportString += `
            quad: {
                ${quadString}
            },
            quadContent: {
                ${quadContentString}
            },
        `;
	}

	console.log(exportString);

	let TailwindExportString = `
        extend: {
            colors: {
                ${exportString}
            }
        }
    `;

	return TailwindExportString;
};
