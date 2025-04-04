import type { Metadata } from "next";
import DemoCalibrator from "@/components/demo-prep/DemoCalibrator";

export const metadata: Metadata = {
  title: "Demo Script Calibrator | DemoGenius AI",
  description: "Calibrate your demo script based on prospect profile and generate tailored presentations",
};

export default function DemoCalibratorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demo Script Calibrator</h1>
        <p className="text-muted-foreground mt-2">
          Tailor your demo script to your prospect's profile and generate a customized presentation
        </p>
      </div>
      
      <DemoCalibrator />
    </div>
  );
}
