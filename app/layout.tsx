import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/src/context/AuthProvider";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata = { title: "Accounting AML" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (  
    <html lang="es">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" reverseOrder={false} />

        </AuthProvider>
      </body>
    </html>
  );
}
