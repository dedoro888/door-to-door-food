import { Home, Search, Compass, ClipboardList, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useRef, useMemo } from "react";

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

const TAB_WIDTH = 56;
const NAV_PADDING_X = 8;
const BUBBLE_SIZE = 52;

const BottomNav = ({ active, onSearch }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders } = useCart();
  const lastTap = useRef<Record<string, number>>({});

  const activeOrderCount = orders.filter(
    (o) => o.paymentStatus === "paid" && !o.cancelled && o.stage < 3
  ).length;

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => t.id === active),
    [active]
  );

  const handleTap = (tab: (typeof tabs)[0]) => {
    const now = Date.now();
    if (now - (lastTap.current[tab.id] ?? 0) < 400) return;
    lastTap.current[tab.id] = now;

    if (tab.id === "search" && onSearch) {
      onSearch();
      return;
    }
    if (tab.path && location.pathname !== tab.path) {
      navigate(tab.path);
    }
  };

  // Calculate the center X of the active tab relative to the inner bar
  const totalBarWidth = tabs.length * TAB_WIDTH;
  const bubbleCenterX =
    NAV_PADDING_X + activeIndex * TAB_WIDTH + TAB_WIDTH / 2;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="w-full max-w-md px-5 pb-3 pointer-events-auto">
        {/* Wrapper with relative positioning for the bubble */}
        <div className="relative">
          {/* Floating bubble for active tab */}
          <div
            className="absolute z-10 flex items-center justify-center transition-all duration-500"
            style={{
              width: BUBBLE_SIZE,
              height: BUBBLE_SIZE,
              borderRadius: "50%",
              background: "hsl(var(--primary))",
              boxShadow:
                "0 4px 20px hsl(var(--primary) / 0.45), 0 0 0 4px hsl(var(--card))",
              top: -BUBBLE_SIZE / 2 + 6,
              left: `calc(${bubbleCenterX}px - ${BUBBLE_SIZE / 2}px)`,
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {tabs[activeIndex] && (() => {
              const ActiveIcon = tabs[activeIndex].icon;
              return (
                <ActiveIcon
                  className="transition-transform duration-300"
                  style={{
                    color: "hsl(var(--primary-foreground))",
                    width: 22,
                    height: 22,
                    strokeWidth: 2.4,
                  }}
                />
              );
            })()}
          </div>

          {/* SVG notch cutout mask behind bubble */}
          <svg
            className="absolute z-[5] pointer-events-none transition-all duration-500"
            style={{
              top: -14,
              left: `calc(${bubbleCenterX}px - 36px)`,
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            width="72"
            height="28"
            viewBox="0 0 72 28"
            fill="none"
          >
            <path
              d="M0 28C0 28 12 28 18 20C24 12 28 0 36 0C44 0 48 12 54 20C60 28 72 28 72 28"
              fill="hsl(var(--card))"
            />
          </svg>

          {/* The bar itself */}
          <div
            className="relative flex items-end justify-around rounded-[22px] overflow-visible"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.5)",
              boxShadow:
                "0 -2px 24px hsl(0 0% 0% / 0.18), 0 8px 32px hsl(0 0% 0% / 0.22)",
              padding: `14px ${NAV_PADDING_X}px 10px`,
            }}
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeIndex === index;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTap(tab)}
                  className="relative flex flex-col items-center justify-end gap-1 transition-all duration-300"
                  style={{
                    width: TAB_WIDTH,
                    height: 44,
                    opacity: isActive ? 0 : 1,
                    transform: isActive ? "scale(0.85)" : "scale(1)",
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <Icon
                      className="transition-all duration-300"
                      style={{
                        color: "hsl(var(--muted-foreground))",
                        width: 20,
                        height: 20,
                        strokeWidth: 1.7,
                      }}
                    />
                    {tab.id === "orders" && activeOrderCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] rounded-full text-[8px] font-bold flex items-center justify-center px-1 z-20"
                        style={{
                          background: "hsl(var(--destructive))",
                          color: "hsl(var(--destructive-foreground))",
                        }}
                      >
                        {activeOrderCount > 9 ? "9+" : activeOrderCount}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[9px] font-medium leading-none transition-all duration-300"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}

            {/* Active label rendered below the bubble position */}
            <div
              className="absolute bottom-[6px] transition-all duration-500 pointer-events-none"
              style={{
                left: `calc(${bubbleCenterX}px)`,
                transform: "translateX(-50%)",
                transitionTimingFunction:
                  "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <span
                className="text-[9px] font-bold leading-none"
                style={{ color: "hsl(var(--primary))" }}
              >
                {tabs[activeIndex]?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
