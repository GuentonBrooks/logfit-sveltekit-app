import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const alchemyColors = {
	'alchemy-primary': '#272266',
	'alchemy-secondary': '#43B14A',
	'alchemy-tertiary': '#FFC918',
	'alchemy-success': '#4F67AF',
	'alchemy-warning': '#F57C00',
	'alchemy-error': '#FF3333',
	'alchemy-surface': '#0c0a1f',
	'alchemy-surface-light': '#ceced2',
	'alchemy-surface-dark': '#06050f',
};

export const fitlogTheme: CustomThemeConfig = {
	name: 'fitlog-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Outfit`,
		'--theme-font-family-heading': `CaptureIt`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '0px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #EB2938
		'--color-primary-50': '252 223 225', // #fcdfe1
		'--color-primary-100': '251 212 215', // #fbd4d7
		'--color-primary-200': '250 202 205', // #facacd
		'--color-primary-300': '247 169 175', // #f7a9af
		'--color-primary-400': '241 105 116', // #f16974
		'--color-primary-500': '235 41 56', // #EB2938
		'--color-primary-600': '212 37 50', // #d42532
		'--color-primary-700': '176 31 42', // #b01f2a
		'--color-primary-800': '141 25 34', // #8d1922
		'--color-primary-900': '115 20 27', // #73141b
		// secondary | #0F1A20
		'--color-secondary-50': '219 221 222', // #dbddde
		'--color-secondary-100': '207 209 210', // #cfd1d2
		'--color-secondary-200': '195 198 199', // #c3c6c7
		'--color-secondary-300': '159 163 166', // #9fa3a6
		'--color-secondary-400': '87 95 99', // #575f63
		'--color-secondary-500': '15 26 32', // #0F1A20
		'--color-secondary-600': '14 23 29', // #0e171d
		'--color-secondary-700': '11 20 24', // #0b1418
		'--color-secondary-800': '9 16 19', // #091013
		'--color-secondary-900': '7 13 16', // #070d10
		// tertiary | #FFFFFF
		'--color-tertiary-50': '255 255 255', // #ffffff
		'--color-tertiary-100': '255 255 255', // #ffffff
		'--color-tertiary-200': '255 255 255', // #ffffff
		'--color-tertiary-300': '255 255 255', // #ffffff
		'--color-tertiary-400': '255 255 255', // #ffffff
		'--color-tertiary-500': '255 255 255', // #FFFFFF
		'--color-tertiary-600': '230 230 230', // #e6e6e6
		'--color-tertiary-700': '191 191 191', // #bfbfbf
		'--color-tertiary-800': '153 153 153', // #999999
		'--color-tertiary-900': '125 125 125', // #7d7d7d
		// success | #DDE0BD
		'--color-success-50': '250 250 245', // #fafaf5
		'--color-success-100': '248 249 242', // #f8f9f2
		'--color-success-200': '247 247 239', // #f7f7ef
		'--color-success-300': '241 243 229', // #f1f3e5
		'--color-success-400': '231 233 209', // #e7e9d1
		'--color-success-500': '221 224 189', // #DDE0BD
		'--color-success-600': '199 202 170', // #c7caaa
		'--color-success-700': '166 168 142', // #a6a88e
		'--color-success-800': '133 134 113', // #858671
		'--color-success-900': '108 110 93', // #6c6e5d
		// warning | #EF8A17
		'--color-warning-50': '253 237 220', // #fdeddc
		'--color-warning-100': '252 232 209', // #fce8d1
		'--color-warning-200': '251 226 197', // #fbe2c5
		'--color-warning-300': '249 208 162', // #f9d0a2
		'--color-warning-400': '244 173 93', // #f4ad5d
		'--color-warning-500': '239 138 23', // #EF8A17
		'--color-warning-600': '215 124 21', // #d77c15
		'--color-warning-700': '179 104 17', // #b36811
		'--color-warning-800': '143 83 14', // #8f530e
		'--color-warning-900': '117 68 11', // #75440b
		// error | #FC0901
		'--color-error-50': '255 218 217', // #ffdad9
		'--color-error-100': '254 206 204', // #fececc
		'--color-error-200': '254 194 192', // #fec2c0
		'--color-error-300': '254 157 153', // #fe9d99
		'--color-error-400': '253 83 77', // #fd534d
		'--color-error-500': '252 9 1', // #FC0901
		'--color-error-600': '227 8 1', // #e30801
		'--color-error-700': '189 7 1', // #bd0701
		'--color-error-800': '151 5 1', // #970501
		'--color-error-900': '123 4 0', // #7b0400
		// surface | #0F1A20
		'--color-surface-50': '219 221 222', // #dbddde
		'--color-surface-100': '207 209 210', // #cfd1d2
		'--color-surface-200': '195 198 199', // #c3c6c7
		'--color-surface-300': '159 163 166', // #9fa3a6
		'--color-surface-400': '87 95 99', // #575f63
		'--color-surface-500': '15 26 32', // #0F1A20
		'--color-surface-600': '14 23 29', // #0e171d
		'--color-surface-700': '11 20 24', // #0b1418
		'--color-surface-800': '9 16 19', // #091013
		'--color-surface-900': '7 13 16', // #070d10
	},
};
