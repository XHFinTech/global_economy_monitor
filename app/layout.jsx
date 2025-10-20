import "./globals.css";

export const metadata = {
  title: "Global Trend Monitor",
  description: "Virtualized 24/7 economic & market trends dashboard",
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
