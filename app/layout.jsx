import "./globals.css";

export const metadata = {
  title: "Elite Fusion Trading",
  description: "Trade Smarter, Not Harder - Professional multi-asset trading platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
