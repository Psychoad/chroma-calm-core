import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: 'hsl(var(--surface))',
				'surface-elevated': 'hsl(var(--surface-elevated))',
				canvas: 'hsl(var(--canvas))',
				'canvas-overlay': 'hsl(var(--canvas-overlay))',
				'text-input': 'hsl(var(--text-input))',
				'text-muted': 'hsl(var(--text-muted))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				calm: {
					DEFAULT: 'hsl(var(--calm))',
					light: 'hsl(var(--calm-light))'
				},
				healing: {
					DEFAULT: 'hsl(var(--healing))',
					light: 'hsl(var(--healing-light))'
				},
				strength: {
					DEFAULT: 'hsl(var(--strength))',
					light: 'hsl(var(--strength-light))'
				},
				wisdom: {
					DEFAULT: 'hsl(var(--wisdom))',
					light: 'hsl(var(--wisdom-light))'
				},
				joy: {
					DEFAULT: 'hsl(var(--joy))',
					light: 'hsl(var(--joy-light))'
				},
				balance: {
					DEFAULT: 'hsl(var(--balance))',
					light: 'hsl(var(--balance-light))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'breathe': {
					'0%, 100%': { 
						transform: 'scale(1)',
						opacity: '0.6'
					},
					'50%': { 
						transform: 'scale(1.05)',
						opacity: '0.8'
					}
				},
				'pulse-soft': {
					'0%, 100%': { 
						opacity: '0.4',
						transform: 'translateY(0px)'
					},
					'50%': { 
						opacity: '0.8',
						transform: 'translateY(-10px)'
					}
				},
				'flow': {
					'0%': { 
						transform: 'translateX(-100px) rotate(0deg)',
						opacity: '0'
					},
					'10%, 90%': { 
						opacity: '0.6'
					},
					'100%': { 
						transform: 'translateX(100px) rotate(360deg)',
						opacity: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'flow': 'flow 8s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
