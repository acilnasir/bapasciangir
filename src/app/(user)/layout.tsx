import Navbar from "../components/fragments/navbar";
import FooterSection from "../components/views/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      {children}
      <FooterSection />
    </div>
  );
}
