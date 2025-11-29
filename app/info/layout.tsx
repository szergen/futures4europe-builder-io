import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Futures4Europe Info",
    default: "Information | Futures4Europe",
  },
  description: "Information and resources from Futures4Europe",
};

interface InfoLayoutProps {
  children: React.ReactNode;
}

export default function InfoLayout({ children }: InfoLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Optional: Add a breadcrumb or navigation header here */}
      <main>{children}</main>
    </div>
  );
}
