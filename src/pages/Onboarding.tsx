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

const OnboardingContainer: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Bestimme den nächsten fehlenden Step
  const nextField = user.missing_onboarding_fields[0];

  let StepComponent = null;
  if (nextField === 'ultra_name') StepComponent = <ChooseUltraNameStep user={user} onSuccess={fetchUser} />;
  else if (nextField === 'faction') StepComponent = <ChooseFactionStep user={user} onSuccess={fetchUser} />;
  else if (nextField === 'origin') StepComponent = <ChooseOriginStep user={user} onSuccess={fetchUser} />;
  else if (nextField === 'bio') StepComponent = <WriteBioStep user={user} onSuccess={fetchUser} />;
  else if (nextField === 'avatar_url') StepComponent = <CreateAvatarStep user={user} onSuccess={fetchUser} />;

  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
          {StepComponent}
        </div>
      </div>
    </Layout>
  );
};

export default OnboardingContainer;
