import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "pt" }>;
}>) {
  return (
    <html lang="en">
      <body className={`$antialiased`}>
        <Header params={params} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
