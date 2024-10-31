// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  presets: [require("@vert-capital/calendar-ui/tailwind.base.config.cjs")],
  corePlugins: {
    preflight: false,
  },
};
