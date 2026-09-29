/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0095FF', dark: '#007FE0', darker: '#006CC2', light: '#E8F4FF', ring: '#BFE6FF' },
        ink: { DEFAULT: '#0F172A', soft: '#3F3F46', mute: '#64748B' },
        teal: { grad: '#06B79C' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'Inter', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(30,64,175,.12)',
        soft: '0 4px 20px -6px rgba(15,23,42,.10)',
        btn: '0 8px 20px -6px rgba(0,149,255,.55)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: .35 } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(14px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
        fadeUp: 'fadeUp .7s ease both',
      },
    },
  },
  plugins: [],
};
