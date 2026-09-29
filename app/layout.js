import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/600.css';
import './globals.css';

export const metadata = {
  title: 'CampusPe – Connect 10X Faster',
  description: 'One platform connecting students, colleges & employers — faster.',
  icons: { icon: '/images/logo.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
