import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className="min-h-screen pb-20 md:pb-8">{children}</main>
    <Footer />
    <BottomNav />
  </>
);

export default Layout;
