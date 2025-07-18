// src/pages/Onboarding.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '@/lib/api';

// Step-Komponenten (werden nach und nach implementiert)
import ChooseUltraNameStep from '../components/onboarding/ChooseUltraNameStep';
import ChooseFactionStep from '../components/onboarding/ChooseFactionStep';
import ChooseOriginStep from '../components/onboarding/ChooseOriginStep';
import WriteBioStep from '../components/onboarding/WriteBioStep';
import CreateAvatarStep from '../components/onboarding/CreateAvatarStep';
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import LayoutWithBottomNav from "@/components/layout/LayoutWithBottomNav";
import Navbar from "@/components/Navbar";

interface Faction {
  id: number;
  name: string;
  style: string;
  icon: string;
}

interface Origin {
  id: number;
  name: string;
  type: string;
}

interface User {
  id: number;
  username: string;
  ultra_name?: string;
  level: number;
  xp: number;
  rank: string;
  avatar_url?: string;
  bio?: string;
  faction?: Faction;
  origin?: Origin;
  missing_onboarding_fields: string[];
}

const ONBOARDING_STEPS = [
  'ultra_name',
  'faction',
  'origin',
  'bio',
  'avatar_url',
];

const OnboardingContainer: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/v1/auth/me/');
      if (!res.ok) throw new Error('Fehler beim Laden der Userdaten');
      const data = await res.json();
      setUser(data);
      setLoading(false);
      // Wenn Onboarding fertig, weiterleiten
      if (data.missing_onboarding_fields.length === 0) {
        navigate('/dashboard');
      } else {
        // Setze StepIndex auf den ersten fehlenden Step
        const firstMissing = ONBOARDING_STEPS.findIndex(f => data.missing_onboarding_fields.includes(f));
        setStepIndex(firstMissing >= 0 ? firstMissing : 0);
      }
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Lade...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }
  if (!user) return null;

  // Step-Komponenten
  const stepField = ONBOARDING_STEPS[stepIndex];
  let StepComponent = null;
  if (stepField === 'ultra_name') StepComponent = <ChooseUltraNameStep user={user} onSuccess={fetchUser} />;
  else if (stepField === 'faction') StepComponent = <ChooseFactionStep user={user} onSuccess={fetchUser} />;
  else if (stepField === 'origin') StepComponent = <ChooseOriginStep user={user} onSuccess={fetchUser} />;
  else if (stepField === 'bio') StepComponent = <WriteBioStep user={user} onSuccess={fetchUser} />;
  else if (stepField === 'avatar_url') StepComponent = <CreateAvatarStep user={user} onSuccess={fetchUser} />;

  // Step-Navigation
  const handlePrev = () => setStepIndex(i => Math.max(0, i - 1));
  const handleNext = () => setStepIndex(i => Math.min(ONBOARDING_STEPS.length - 1, i + 1));

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black pt-20">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <div className="w-full">{StepComponent}</div>
          <div className="flex justify-between w-full mt-8">
            {stepIndex > 0 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold"
              >
                Zurück
              </button>
            ) : <div />}
            <div className="text-gray-500 font-semibold">Schritt {stepIndex + 1} / {ONBOARDING_STEPS.length}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingContainer;
