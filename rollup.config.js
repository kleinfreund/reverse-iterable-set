import { defineConfig } from 'rollup'
import terser from '@rollup/plugin-terser'

export default defineConfig({
	input: 'src/reverse-iterable-set.js',
	output: {
		dir: 'dist',
	},
	plugins: [
		terser(),
	],
})
