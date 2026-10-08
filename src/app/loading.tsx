import { LogoLoader } from "@/components/logo-loader";
import { SplashTips } from "@/components/splash-tips";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 grid min-h-screen place-items-center bg-paper px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <LogoLoader />
        <p className="animate-pulse font-mono text-xs tracking-[0.24em] text-ink/40 uppercase">
          Loading
        </p>
        <SplashTips />
      </div>
    </div>
  );
}