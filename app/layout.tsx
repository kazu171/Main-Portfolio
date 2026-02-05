// Root layout delegates to [locale]/layout.tsx which renders <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
