/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "#7c3aed",
			50: "#f5f3ff",
			100: "#ede9fe",
			200: "#ddd6fe",
			300: "#c4b5fd",
			400: "#a78bfa",
			500: "#8b5cf6",
			600: "#7c3aed",
			700: "#6d28d9",
			800: "#5b21b6",
			900: "#4c1d95",
			950: "#2e1065",
		  },
		  secondary: {
			DEFAULT: "#0f172a",
			50: "#f8fafc",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569",
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			950: "#020617",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		animation: {
		  float: "float 6s ease-in-out infinite",
		  morph: "morph 8s ease-in-out infinite",
		  "fade-in": "fadeIn 0.5s ease-in-out forwards",
		  "fade-up": "fadeInUp 0.8s ease-out forwards",
		  "pulse-slow": "pulse 4s ease-in-out infinite",
		},
		keyframes: {
		  float: {
			"0%, 100%": { transform: "translateY(0)" },
			"50%": { transform: "translateY(-20px)" },
		  },
		  morph: {
			"0%, 100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
			"50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
		  },
		  fadeIn: {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" },
		  },
		  fadeInUp: {
			"0%": { opacity: "0", transform: "translateY(20px)" },
			"100%": { opacity: "1", transform: "translateY(0)" },
		  },
		  pulse: {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.5" },
		  },
		},
	  },
	},
	plugins: [],
  }  