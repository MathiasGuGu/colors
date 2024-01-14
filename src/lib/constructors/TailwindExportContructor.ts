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
	let PrimaryString = constructTailwindColorString(color.primary, option);
	let SecondaryString = constructTailwindColorString(color.secondary, option);
	let TertiaryString = constructTailwindColorString(color.tertiary, option);
	let PrimaryContentString = constructTailwindColorString(color.primaryContent, option);
	let SecondaryContentString = constructTailwindColorString(color.secondaryContent, option);
	let TertiaryContentString = constructTailwindColorString(color.tertiaryContent, option);

	let TailwindExportString = `
        extend: {
            colors: {
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
            }
        }
    `;

	return TailwindExportString;
};
