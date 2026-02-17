import { Link, useLocation } from "react-router-dom";
import { Home, Radio, ArrowLeftRight, TableProperties, Search } from "lucide-react";

const tabs = [
  { label: "Home", to: "/", icon: Home },
  { label: "Live", to: "/live", icon: Radio },
  { label: "Transfers", to: "/transfers", icon: ArrowLeftRight },
  { label: "Tables", to: "/tables", icon: TableProperties },
  { label: "Search", to: "/search", icon: Search },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-semibold transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
