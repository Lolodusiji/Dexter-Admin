/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JSX and TSX files
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // ShadCN components
  ],

  theme: {
    extend: {
      colors: {
        // primaryColor: {
        // 	DEFAULT: 'hsl(var(--primary))',
        // 	foreground: 'hsl(var(--primary-foreground))'
        // },
        // secondaryColor: {
        // 	DEFAULT: 'hsl(var(--secondary))',
        // 	foreground: 'hsl(var(--secondary-foreground))'
        // },
        primary: " #6D68FB",
        secondary: "#7A8EAC",
        tetiary: "#344054",
        layer: "#F1F1FF",
        hover: "#F9FAFB",
        container: {
          padding: "1rem",
          center: true,
        },
        container_none: {
          padding: "0",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
};
