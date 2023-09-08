module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  plugins: [require('@tailwindcss/forms')],
};
