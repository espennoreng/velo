/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
	highlight: {
		darkest: '#006FFD',
		light: '#B3DAFF',
		lightest: '#EAF2FF',
	},
	neutral: {
		dark: {
			dark: "#2F3036",
			darkest: '#1E1E1E',
			light: '#71727A',
			lightest: '#8F9098',
		},
		light: {
			medium: '#E8E9F1',
			light: '#F8F9FE',
			lightest: '#FFFFFF',
		}
	},
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
	highlight: {
		darkest: '#006FFD',
		light: '#B3DAFF',
		lightest: '#EAF2FF',
	},
	neutral: {
		dark: {
			dark: "#2F3036",
			darkest: '#1E1E1E',
			light: '#71727A',
			lightest: '#8F9098',
		},
		light: {
			medium: '#E8E9F1',
			light: '#F8F9FE',
			lightest: '#FFFFFF',
		}
	},
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
