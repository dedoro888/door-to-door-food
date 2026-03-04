import { useNavigate } from "react-router-dom";
import { ArrowRight, Utensils, ChefHat, Flame } from "lucide-react";

const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col relative overflow-hidden"
      style={{ background: "hsl(var(--primary))" }}
    >
      {/* Subtle food line illustration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid of subtle icons */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-[0.07]"
            style={{
              top: `${(i % 5) * 22 - 5}%`,
              left: `${Math.floor(i / 5) * 28 - 5}%`,
              transform: `rotate(${i * 18}deg)`,
            }}
          >
            {i % 3 === 0 ? (
              <Utensils className="w-14 h-14 text-white" strokeWidth={1} />
            ) : i % 3 === 1 ? (
              <ChefHat className="w-14 h-14 text-white" strokeWidth={1} />
            ) : (
              <Flame className="w-14 h-14 text-white" strokeWidth={1} />
            )}
          </div>
        ))}
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-[40px] border-white/10" />
        <div className="absolute top-10 -left-16 w-40 h-40 rounded-full border-[24px] border-white/10" />
      </div>

      {/* Top section — Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 pt-16">
        {/* Logo mark */}
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
          style={{
            background: "white",
            boxShadow: "0 20px 60px hsl(0 0% 0% / 0.25)",
          }}
        >
          <Flame className="w-10 h-10" style={{ color: "hsl(var(--primary))" }} />
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight leading-none mb-2">
          VenDoor
        </h1>
        <p className="text-white/70 text-base font-medium">Your campus food universe</p>
      </div>

      {/* Bottom curved black section — 38% */}
      <div
        className="relative z-10 px-6 pb-10 pt-10"
        style={{
          background: "hsl(20 15% 8%)",
          borderTopLeftRadius: "36px",
          borderTopRightRadius: "36px",
          minHeight: "38vh",
        }}
      >
        {/* Decorative pill */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-8" />

        <h2 className="text-3xl font-black text-white leading-tight mb-3">
          Hungry?{"\n"}
          <span style={{ color: "hsl(var(--primary))" }}>Get It Fast.</span>
        </h2>
        <p className="text-base mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
          Fresh, fast, and tailored to your taste!
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold transition-all active:scale-[0.97]"
          style={{
            background: "hsl(var(--primary))",
            color: "white",
            boxShadow: "0 8px 32px hsl(var(--primary) / 0.45)",
          }}
        >
          Order Now
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
