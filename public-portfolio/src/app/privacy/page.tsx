import { supabase } from "@/lib/supabase";
import AdBanner from "@/components/AdBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Portfolio",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PrivacyPage() {
  const { data: settingsData } = await supabase
    .from("site_settings")
    .select("privacy_policy")
    .limit(1)
    .single();

  const privacyPolicy = settingsData?.privacy_policy || "No privacy policy available at this time.";

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
          {privacyPolicy}
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <AdBanner slotId="Privacy Page Bottom" />
      </div>
    </div>
  );
}
