import "./globals.css";

export const metadata = {
  icons: {
    icon: '/favicon/tulip.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
