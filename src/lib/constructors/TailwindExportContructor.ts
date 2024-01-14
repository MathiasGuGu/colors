import chroma from 'chroma-js';
import {
	generateRandomTheme,
	type ColorPalette,
	type Color,
	type ColorVarient
} from './ColorsInterface';

const constructColorString = (color: Color | ColorVarient, option: string) => {
	let string = '';

	for (const [key, value] of Object.entries(color)) {
		switch (option) {
			case 'hex':
				string += `${chroma(value).hex()},
                `;
				break;
			case 'rgb':
				string += `rgb(${chroma(value).rgb()}),
                `;
				break;
			case 'hsl':
				string += `hsl(${chroma(value).hsl()}),
                `;
				break;
			default:
				string += `${chroma(value).hex()},
                `;
				break;
		}
	}

	return string;
};

export const constructTailwindExport = (color: ColorPalette, option: string = 'hsl') => {
	let PrimaryString = constructColorString(color.primary, option);
	let SecondaryString = constructColorString(color.secondary, option);
	let TertiaryString = constructColorString(color.tertiary, option);
	let PrimaryContentString = constructColorString(color.primaryContent, option);
	let SecondaryContentString = constructColorString(color.secondaryContent, option);
	let TertiaryContentString = constructColorString(color.tertiaryContent, option);

	let content = `
        primary: {
            ${PrimaryString}
        },
        secondary: {
            ${SecondaryString}
        },
        tertiary: {
            ${TertiaryString}
        },
        primaryContent: {
            ${PrimaryContentString}
        },
        secondaryContent: {
            ${SecondaryContentString}
        },
        tertiaryContent: {
            ${TertiaryContentString}
        }
    `;

	let TailwindExportString = `
        extend: {
            colors: {
                ${content}
            }
          
        }
    `;

	return TailwindExportString;
};
