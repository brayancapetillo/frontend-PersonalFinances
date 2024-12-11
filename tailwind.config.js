/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts,scss}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: 'var(--color-primary-50)',
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
					800: 'var(--color-primary-800)',
					900: 'var(--color-primary-900)',
					950: 'var(--color-primary-950)'
				},
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				danger: 'var(--color-danger)',
				info: 'var(--color-info)',
				help: 'var(--color-help)',

				'surface-ground': 'var(--my-surface-ground)',
				'surface-section': 'var(--my-surface-section)',
				'surface-card': 'var(--my-surface-card)',
				'surface-overlay': 'var(--my-surface-overlay)',
				'surface-border': 'var(--my-surface-border)',
				'surface-hover': 'var(--my-surface-hover)',
				maskbg: 'var(--my-maskbg)',
				'highlight-bg': 'var(--my-highlight-bg)'
			},
			textColor: {
				'base-color': 'var(--my-text-color)',
				'base-color-secundary': 'var(--my-text-color-secondary)',
				'highlight-color': 'var(--my-highlight-text-color)'
			},
			boxShadow: {
				'np-2xl':
					'-0.75rem -0.75rem 1.5rem 0 var(--shadow-color),0.75rem 0.75rem 1.5rem 0 var(--shadow-color-inset),inset -0.125rem -0.125rem 0.25rem 0 var(--shadow-color-inset),inset 0.125rem 0.125rem 0.25rem var(--shadow-color)',
				'np-3xl':
					'-1rem -1rem 1.75rem 0 var(--shadow-color),1rem 1rem 1.75rem 0 var(--shadow-color-inset),inset -0.25rem -0.25rem 0.5rem 0 var(--shadow-color-inset),inset 0.25rem 0.25rem 0.5rem var(--shadow-color)',
				'np-input-sm':
					'-0.25rem -0.25rem 0.5rem 0 var(--shadow-color), 0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset), 0.25rem 0.25rem 0.5rem 0 transparent inset, -0.125rem -0.125rem 0.25rem 0 transparent inset;',
				'np-input-sm-hover':
					'-0.25rem -0.25rem 0.5rem 0 var(--shadow-color), 0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset), 0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset) inset, -0.125rem -0.125rem 0.25rem 0 transparent inset',
				'np-input-sm-focus':
					'-0.25rem -0.25rem 0.5rem 0 var(--shadow-color), 0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset), 0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset) inset, -0.25rem -0.25rem 0.5rem 0 var(--shadow-color) inset;',
				'np-input-sm-focus-invert':
					'0.25rem 0.25rem 0.5rem 0 var(--shadow-color-inset), 0.125rem 0.125rem 0.125rem 0 var(--shadow-color-inset) inset, -0.25rem -0.25rem 0.5rem 0 var(--shadow-color) inset;',
				check: '0.125rem 0.25rem 0.25rem var(--shadow-color-inset)'
			},
			dropShadow: {
				'np-2xl': '0.75rem 0.75rem 0.5rem var(--shadow-color-inset)'
			},
			keyframes: {
				'wipe-down': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(2.5rem)' }
				},
				'wipe-up': {
					'0%': { transform: 'translateY(-2.5rem)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				'wipe-down': 'wipe-down 0.6s ease-in-out forwards',
				'wipe-up': 'wipe-up 0.6s ease-in-out forwards'
			}
		}
	},
	plugins: []
}
