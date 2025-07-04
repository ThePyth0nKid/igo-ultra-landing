import React from "react";

const Impressum = () => (
  <div className="min-h-screen bg-black text-white px-6 py-16 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Impressum</h1>

    <p className="mb-4">Angaben gemäß § 5 TMG</p>

    <p className="mb-2">
      <strong>IGOULTRA</strong><br />
      Petkusser Hauptstraße 9<br />
      15837 Baruth/Mark<br />
      Deutschland
    </p>

    <p className="mb-2">
      Vertreten durch: <strong>Nelson Mehlis</strong>
    </p>

    <p className="mb-2">
      Kontakt:<br />
      E-Mail: <a href="mailto:support@igoultra.de" className="underline text-blue-400">support@igoultra.de</a>
    </p>

    <p className="mt-8 text-xs text-gray-400">
      Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV: Nelson Mehlis
    </p>
  </div>
);

export default Impressum;
