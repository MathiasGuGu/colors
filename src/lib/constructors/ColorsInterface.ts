export interface Color {
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

export interface ColorVarient {
	darkest: string;
	darker: string;
	dark: string;
}

export interface ColorPalette {
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

export let generateRandomTheme = (): ColorPalette => {
	return {
		primary: {
			default: '#000000',
			'50': '#000000',
			'100': '#000000',
			'200': '#000000',
			'300': '#000000',
			'400': '#000000',
			'500': '#000000',
			'600': '#000000',
			'700': '#000000',
			'800': '#000000',
			'900': '#000000',
			'950': '#000000'
		},
		primaryContent: {
			darkest: '#000000',
			darker: '#000000',
			dark: '#000000'
		},
		secondary: {
			default: '#000000',
			'50': '#000000',
			'100': '#000000',
			'200': '#000000',
			'300': '#000000',
			'400': '#000000',
			'500': '#000000',
			'600': '#000000',
			'700': '#000000',
			'800': '#000000',
			'900': '#000000',
			'950': '#000000'
		},
		secondaryContent: {
			darkest: '#000000',
			darker: '#000000',
			dark: '#000000'
		},
		tertiary: {
			default: '#000000',
			'50': '#000000',
			'100': '#000000',
			'200': '#000000',
			'300': '#000000',
			'400': '#000000',
			'500': '#000000',
			'600': '#000000',
			'700': '#000000',
			'800': '#000000',
			'900': '#000000',
			'950': '#000000'
		},
		tertiaryContent: {
			darkest: '#000000',
			darker: '#000000',
			dark: '#000000'
		},
		backgroundColor: '#000000',
		backgroundContent: {
			darkest: '#000000',
			darker: '#000000',
			dark: '#000000'
		},
		foregroundColor: '#000000',
		foregroundContent: {
			darkest: '#000000',
			darker: '#000000',
			dark: '#000000'
		}
	};
};
