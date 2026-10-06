import type { Config } from 'tailwindcss';

const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { primary: '#1769aa', emergency: '#c62828' } } }, plugins: [] };
export default config;
