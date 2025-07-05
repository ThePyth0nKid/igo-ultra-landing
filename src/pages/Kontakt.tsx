import React from "react";

const Kontakt = () => (
  <div className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Kontakt</h1>
    <p className="mb-2">Du hast Fragen oder möchtest mit uns in Kontakt treten?</p>
    <p className="mb-2">Schreib uns gerne eine E-Mail an:</p>
    <a href="mailto:support@igoultra.de" className="text-blue-400 underline">support@igoultra.de</a>
    <p className="mt-8 text-xs text-gray-400">Adresse: Baruth/Mark, Brandenburg</p>
    
    {/* Story Section */}
    <div className="mt-16 pt-8 border-t border-gray-800">
      <h2 className="text-xl font-semibold mb-6 text-blue-400">Unsere Geschichte</h2>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <p>
          Es begann mit einer Vision: Eine Community zu schaffen, die Menschen dabei hilft, 
          ihre Grenzen zu sprengen und ihr volles Potenzial zu entfalten. IGO Ultra wurde 
          aus der Überzeugung geboren, dass jeder Mensch das Zeug dazu hat, außergewöhnlich 
          zu werden.
        </p>
        
        <p>
          Was als kleine Gruppe von Enthusiasten begann, ist heute eine lebendige Community 
          von Menschen, die sich gegenseitig inspirieren und unterstützen. Von Ultra-Fitness 
          über mentale Stärke bis hin zu spirituellem Wachstum – wir glauben daran, dass 
          wahre Transformation nur durch die Verbindung von Körper, Geist und Seele möglich ist.
        </p>
        
        <p>
          Jeder Tag bringt neue Geschichten von Menschen, die ihre Komfortzone verlassen 
          und erstaunliche Dinge erreichen. Ob es der erste Ultramarathon ist, die 
          Überwindung einer mentalen Blockade oder die Entdeckung innerer Stärke – 
          diese Momente sind es, die uns antreiben.
        </p>
        
        <p className="text-blue-400 font-medium">
          Du bist Teil dieser Geschichte. Deine Reise beginnt hier.
        </p>
      </div>
    </div>
  </div>
);

export default Kontakt; 