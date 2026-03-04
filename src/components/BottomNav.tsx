import { Home, Search, Compass, ClipboardList, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface BottomNavProps {
  active: string;
  onSearch?: () => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Home", path: "/" },
  { id: "search", icon: Search, label: "Search", path: "" },
  { id: "discover", icon: Compass, label: "Discover", path: "/discover" },
  { id: "orders", icon: ClipboardList, label: "Orders", path: "/orders" },
  { id: "profile", icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = ({ active, onSearch }: BottomNavProps) => {
  const navigate = useNavigate();
  const { orders } = useCart();

  const activeOrderCount = orders.filter(
    (o) => o.paymentStatus === "paid" && !o.cancelled && o.stage < 3
  ).length;

  const handleTap = (tab: typeof tabs[0]) => {
    if (tab.id === "search" && onSearch) {
      onSearch();
    } else if (tab.path) {
      navigate(tab.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-4 pt-2 relative pointer-events-auto">
        <div
          className="flex items-center justify-around py-2 px-2 rounded-[24px]"
          style={{
            background: "hsl(20 15% 10%)",
            border: "1px solid hsl(20 12% 22%)",
            boxShadow: "0 -4px 24px hsl(0 0% 0% / 0.4), 0 8px 32px hsl(0 0% 0% / 0.3)",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTap(tab)}
                className="relative flex flex-col items-center justify-center transition-all duration-200 ease-out w-14 py-1.5 gap-0.5 rounded-2xl"
              >
                {/* Active highlight — pill under icon only, no halo */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "hsl(var(--primary) / 0.15)",
                    }}
                  />
                )}

                <div className="relative w-7 h-7 flex items-center justify-center">
                  <Icon
                    className="relative w-[18px] h-[18px] transition-all duration-200"
                    style={isActive ? { color: "hsl(var(--primary))", strokeWidth: 2.5 } : { color: "hsl(var(--muted-foreground))" }}
                  />
                  {/* Orders badge */}
                  {tab.id === "orders" && activeOrderCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] rounded-full text-[9px] font-bold flex items-center justify-center px-0.5 z-20"
                      style={{
                        background: "hsl(var(--destructive))",
                        color: "white",
                      }}
                    >
                      {activeOrderCount > 9 ? "9+" : activeOrderCount}
                    </span>
                  )}
                </div>

                <span
                  className="relative text-[9px] font-semibold transition-all duration-200 leading-none"
                  style={isActive ? { color: "hsl(var(--primary))" } : { color: "hsl(var(--muted-foreground))" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
