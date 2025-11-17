import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  DollarSign,
  Users,
  Heart,
  AlertCircle,
} from "lucide-react";

const InsuranceComparator = () => {
  const [selectedConcurrent, setSelectedConcurrent] = useState("");

  // FIDELAMI SANTÉ - Données officielles
  const fidelAmi = {
    name: "FidelAmi Santé",
    tauxMin: 60,
    tauxMax: 90,
    plafondMin: 1000,
    plafondMax: 2500,
    franchise: 0,
    preventionMax: 120,
    carenceMaladieJeune: 30,
    carenceAccidentJeune: 1,
    ageMax: "Illimité",
    avanceFrais: false,
    assistance24: false,
    sansFranchise: true,
    sansEngagement: true,
  particularites: [
  "Sans franchise (min 15€)",
  "Sans engagement - Résiliation libre",
  "Sans limite d'âge",
  "Remboursement 48h",
  "Service client humain",
  "5 formules 60% à 90%",
  "Réduction 10% dès 2e animal",
  "Délai carence réduit jeunes animaux",
  "Couverture césarienne (60j carence)",
  "Téléconseils santé inclus",
  "Gestion interne des sinistres",
],
  };

  // CONCURRENTS - Données vérifiées
  const concurrents = {
    "SantéVet": {
      name: "SantéVet",
      tauxMax: 100,
      plafondMax: 5000,
      franchise: 50,
      preventionMax: 150,
      carenceMaladie: 45,
      carenceAccident: 0,
      ageMax: 7,
      avanceFrais: true,
      assistance24: true,
    particularites: [
  "Leader du marché (2003)",
  "Service Payvet (avance frais)",
  "Assistance 24/7",
  "Jusqu'à 100% remboursement",
  "Médecines douces : ostéo, acupuncture, phyto, homéo, physio",
  "Frais ambulance remboursés",
  "Radiothérapie incluse",
  "Détartrage 1x/an après 2 ans",
  "Budget prévention dès souscription",
  "Formule Cat Indoor chats intérieur",
  "20 000+ avis Trustpilot",
],
    },
    "Dalma": {
      name: "Dalma",
      tauxMax: 100,
      plafondMax: 2500,
      franchise: 0,
      preventionMax: 200,
      carenceMaladie: 45,
      carenceAccident: 0,
      ageMax: 8,
      avanceFrais: false,
      assistance24: false,
  particularites: [
  "100% digital",
  "Sans franchise",
  "50% remboursements en 30s",
  "Personnalisable",
  "⚠️ Taux dégressif après 10 ans",
  "Engagement 12 mois minimum",
  "Résiliation libre après 13e mois",
  "Tchat vétérinaire dans app",
  "Option décès 300€ (<8 ans)",
  "Réduction -25% vétérinaires/ASV",
  "Couverture mondiale",
  "Exclus dysplasie/luxation/entropion",
  "Dons refuges (engagement animal)",
],
    },
    "Bulle Bleue": {
      name: "Bulle Bleue",
      tauxMax: 80,
      plafondMax: 2000,
      franchise: 75,
      preventionMax: 100,
      carenceMaladie: 7,
      carenceAccident: 7,
      ageMax: 10,
      avanceFrais: false,
      assistance24: false,
      particularites: [
  "Créée par vétérinaires (2008)",
  "Rachetée par SantéVet (2019)",
  "Carence ultra-courte (7j)",
  "Certificat véto réduit carence",
  "Taux fixe 80%",
  "Remboursement 5 jours",
  "Garanties à vie si assuré <5 ans",
  "Basée à Villeneuve d'Ascq",
],
    },
    "Carrefour": {
      name: "Carrefour",
      tauxMax: 80,
      plafondMax: 2500,
      franchise: 0,
      preventionMax: 76,
      carenceMaladie: 90,
      carenceAccident: 30,
      ageMax: 8,
      avanceFrais: false,
      assistance24: false,
    particularites: [
  "Prix compétitif",
  "Multi-animaux",
  "Sans franchise",
  "Garde animal vacances couverte",
  "Quelle que soit personne gardienne",
  "Accessible en grande surface",
],
    },
    "Agria": {
      name: "Agria",
      tauxMax: 90,
      plafondMax: 4500,
      franchise: "Annuelle",
      preventionMax: 80,
      carenceMaladie: 20,
      carenceAccident: 1,
      ageMax: "Illimité",
      avanceFrais: false,
      assistance24: false,
   particularites: [
  "⭐ UNIQUE: Sans limite d'âge",
  "Plafond élevé (4500€)",
  "Franchise annuelle unique (1x/an)",
  "Garanties à vie",
  "Cotisations stables (pas variation âge)",
  "Remboursements constants à vie",
  "Origine suédoise (expertise)",
  "Formules 100% personnalisables",
  "Plafonds 1500€, 3000€ ou 4500€",
],
    },
    "Crédit Mutuel": {
      name: "Crédit Mutuel",
      tauxMax: 80,
      plafondMax: 2500,
      franchise: 0,
      preventionMax: 100,
      carenceMaladie: 90,
      carenceAccident: 30,
      ageMax: 8,
      avanceFrais: false,
      assistance24: true,
    particularites: [
  "Filiale PACIFICA",
  "Tarif unique (race/âge)",
  "Sans franchise",
  "Assistance incluse",
  "Réduction 10% multi",
  "Garde animal (hospitalisation)",
  "Recherche animal perdu",
  "Avis disparition presse locale",
  "Garanties à vie si assuré <8 ans",
],
    },
    "ECA Assurances": {
      name: "ECA (Calinia)",
      tauxMax: 100,
      plafondMax: 2500,
      franchise: "20-106€",
      preventionMax: 100,
      carenceMaladie: 60,
      carenceAccident: 15,
      ageMax: 12,
      avanceFrais: false,
      assistance24: true,
      particularites: [
  "100% frais chirurgicaux",
  "5 formules disponibles",
  "Contrat à vie",
  "Réduction 25% 2e animal",
  "200 000+ animaux couverts",
  "92% satisfaction client",
  "Réduction 5% après 3 ans",
  "Capital décès optionnel (150-1500€)",
  "RC chiens catégorie 2&3",
  "Frais inhumation 150€",
  "Pharmacie 100€/an",
  "Scanner/IRM 100€/examen",
  "Accessible 3 mois à 12 ans",
],
    },
    "Assur O'Poil": {
      name: "Assur O'Poil",
      tauxMax: 90,
      plafondMax: 3000,
      franchise: 15,
      preventionMax: 120,
      carenceMaladie: 45,
      carenceAccident: 0,
      ageMax: 7,
      avanceFrais: false,
      assistance24: false,
  particularites: [
  "Gestion digitale",
  "Remboursement 72h annoncé",
  "Formules modulables",
  "Franchise minimum 15€",
  "Accessible jusqu'à 7 ans",
  "Formules: Préventive, Intégrale, Chat+, Chien+",
],
    },
  };

  const concurrent = selectedConcurrent ? concurrents[selectedConcurrent] : null;

  // ANALYSE COMPARATIVE
  const analysis = useMemo(() => {
    if (!concurrent) return { pointsForts: [], pointsFaibles: [] };

    const pointsForts = [];
    const pointsFaibles = [];

    // Franchise
    if (fidelAmi.franchise === 0 && concurrent.franchise > 0) {
      pointsForts.push({
        icon: DollarSign,
        titre: "Sans franchise",
        detail: `FidelAmi: 0€ vs ${concurrent.name}: ${concurrent.franchise}${typeof concurrent.franchise === 'string' ? '' : '€'}`,
        impact: "Remboursement dès 15€",
      });
    }

    // Taux max
    if (fidelAmi.tauxMax > concurrent.tauxMax) {
      pointsForts.push({
        icon: Shield,
        titre: "Meilleur taux",
        detail: `FidelAmi: ${fidelAmi.tauxMax}% vs ${concurrent.tauxMax}%`,
        impact: `+${fidelAmi.tauxMax - concurrent.tauxMax}%`,
      });
    } else if (fidelAmi.tauxMax < concurrent.tauxMax) {
      pointsFaibles.push({
        icon: Shield,
        titre: "Taux inférieur",
        detail: `FidelAmi: ${fidelAmi.tauxMax}% vs ${concurrent.tauxMax}%`,
        impact: `${concurrent.tauxMax - fidelAmi.tauxMax}% de moins`,
      });
    }

    // Plafond
    if (fidelAmi.plafondMax > concurrent.plafondMax) {
      pointsForts.push({
        icon: DollarSign,
        titre: "Plafond supérieur",
        detail: `${fidelAmi.plafondMax}€ vs ${concurrent.plafondMax}€`,
        impact: `+${fidelAmi.plafondMax - concurrent.plafondMax}€`,
      });
    } else if (fidelAmi.plafondMax < concurrent.plafondMax) {
      pointsFaibles.push({
        icon: DollarSign,
        titre: "Plafond inférieur",
        detail: `${fidelAmi.plafondMax}€ vs ${concurrent.plafondMax}€`,
        impact: `${concurrent.plafondMax - fidelAmi.plafondMax}€ de moins`,
      });
    }

    // Prévention
    if (fidelAmi.preventionMax > concurrent.preventionMax) {
      pointsForts.push({
        icon: Heart,
        titre: "Meilleur forfait prévention",
        detail: `${fidelAmi.preventionMax}€ vs ${concurrent.preventionMax}€`,
        impact: `+${fidelAmi.preventionMax - concurrent.preventionMax}€`,
      });
    } else if (fidelAmi.preventionMax < concurrent.preventionMax) {
      pointsFaibles.push({
        icon: Heart,
        titre: "Forfait prévention inférieur",
        detail: `${fidelAmi.preventionMax}€ vs ${concurrent.preventionMax}€`,
        impact: `${concurrent.preventionMax - fidelAmi.preventionMax}€ de moins`,
      });
    }

    // Carence maladie
    if (fidelAmi.carenceMaladieJeune < concurrent.carenceMaladie) {
      pointsForts.push({
        icon: Clock,
        titre: "Carence plus courte",
        detail: `${fidelAmi.carenceMaladieJeune}j vs ${concurrent.carenceMaladie}j`,
        impact: "Couverture plus rapide",
      });
    } else if (fidelAmi.carenceMaladieJeune > concurrent.carenceMaladie) {
      pointsFaibles.push({
        icon: Clock,
        titre: "Carence plus longue",
        detail: `${fidelAmi.carenceMaladieJeune}j vs ${concurrent.carenceMaladie}j`,
        impact: "Attente plus longue",
      });
    }

    // Âge max
    if (fidelAmi.ageMax === "Illimité" && concurrent.ageMax !== "Illimité") {
      pointsForts.push({
        icon: Users,
        titre: "Sans limite d'âge",
        detail: `Illimité vs ${concurrent.ageMax} ans`,
        impact: "Accepte animaux âgés",
      });
    }

    // Avance frais
    if (!fidelAmi.avanceFrais && concurrent.avanceFrais) {
      pointsFaibles.push({
        icon: DollarSign,
        titre: "Pas d'avance de frais",
        detail: `${concurrent.name} propose Payvet`,
        impact: "Il faut avancer les frais",
      });
    }

    // Assistance
    if (!fidelAmi.assistance24 && concurrent.assistance24) {
      pointsFaibles.push({
        icon: Shield,
        titre: "Pas d'assistance 24/7",
        detail: `${concurrent.name} propose assistance`,
        impact: "Pas de conseil d'urgence",
      });
    }

    // Sans engagement
    if (fidelAmi.sansEngagement) {
      pointsForts.push({
        icon: Heart,
        titre: "Sans engagement",
        detail: "Résiliation libre",
        impact: "Flexibilité maximale",
      });
    }

    return { pointsForts, pointsFaibles };
  }, [selectedConcurrent, concurrent]);

  const scoreCompetitivite = useMemo(() => {
    const total = analysis.pointsForts.length + analysis.pointsFaibles.length;
    if (total === 0) return 50;
    return Math.round((analysis.pointsForts.length / total) * 100);
  }, [analysis]);

  // RENDU
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                FidelAmi Santé vs {selectedConcurrent || "Concurrents"}
              </h1>
              <p className="text-gray-600 font-medium">
                Comparateur d'Assurance Santé Animale
              </p>
            </div>
            {selectedConcurrent && (
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">
                  Score de compétitivité
                </div>
                <div
                  className={`text-4xl font-bold ${
                    scoreCompetitivite >= 60
                      ? "text-green-600"
                      : scoreCompetitivite >= 40
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {scoreCompetitivite}%
                </div>
              </div>
            )}
          </div>

          {/* SÉLECTEUR */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <label className="text-gray-700 font-medium">Comparer avec :</label>
            <select
              value={selectedConcurrent}
              onChange={(e) => setSelectedConcurrent(e.target.value)}
              className="flex-1 md:flex-none px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 font-medium"
            >
              <option value="">Sélectionnez une assurance</option>
              {Object.keys(concurrents).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* INFOS FIDELAMI */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2">
              ℹ️ Points clés FidelAmi Santé
            </h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div>✓ Sans franchise (min 15€)</div>
              <div>✓ Sans engagement</div>
              <div>✓ Sans limite d'âge</div>
              <div>✓ 5 formules (60% à 90%)</div>
              <div>✓ Plafond jusqu'à 2500€</div>
              <div>✓ Remboursement 48h</div>
            </div>
          </div>
        </div>

        {selectedConcurrent ? (
          <>
            {/* JAUGE */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Moins compétitif
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Plus compétitif
                </span>
              </div>
              <div className="w-full h-8 bg-gradient-to-r from-red-200 via-orange-200 via-yellow-200 to-green-300 rounded-full relative">
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gray-800 shadow-lg transition-all"
                  style={{ left: `${scoreCompetitivite}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold">
                    FidelAmi
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* POINTS FORTS */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="text-green-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Points Forts</h2>
                    <p className="text-sm text-gray-600">Avantages</p>
                  </div>
                </div>

                {analysis.pointsForts.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    Aucun avantage identifié
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysis.pointsForts.map((point, index) => {
                      const IconComponent = point.icon;
                      return (
                        <div
                          key={index}
                          className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-green-100 p-2 rounded-lg mt-1">
                              <IconComponent className="text-green-600" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 mb-1">
                                ✓ {point.titre}
                              </h3>
                              <p className="text-sm text-gray-700 mb-2">
                                {point.detail}
                              </p>
                              <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                {point.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* POINTS FAIBLES */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-3 rounded-full">
                    <TrendingDown className="text-red-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Points d'Attention</h2>
                    <p className="text-sm text-gray-600">À considérer</p>
                  </div>
                </div>

                {analysis.pointsFaibles.length === 0 ? (
                  <div className="text-center py-8 text-green-600 font-medium">
                    ✓ FidelAmi compétitif partout !
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysis.pointsFaibles.map((point, index) => {
                      const IconComponent = point.icon;
                      return (
                        <div
                          key={index}
                          className="bg-red-50 rounded-xl p-5 border-l-4 border-red-500"
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-red-100 p-2 rounded-lg mt-1">
                              <IconComponent className="text-red-600" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 mb-1">
                                ⚠ {point.titre}
                              </h3>
                              <p className="text-sm text-gray-700 mb-2">
                                {point.detail}
                              </p>
                              <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                                {point.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* PARTICULARITÉS */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🔍 Particularités
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-blue-900 mb-3">
                    FidelAmi Santé
                  </h3>
                  <ul className="space-y-2">
                    {fidelAmi.particularites.map((p, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigo-900 mb-3">
                    {concurrent.name}
                  </h3>
                  <ul className="space-y-2">
                    {concurrent.particularites.map((p, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* RECOMMANDATION */}
            <div
              className={`mt-8 rounded-2xl shadow-xl p-6 md:p-8 ${
                scoreCompetitivite >= 60
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : scoreCompetitivite >= 40
                  ? "bg-gradient-to-r from-orange-500 to-amber-600"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
              } text-white`}
            >
              <h3 className="text-2xl font-bold mb-3">💡 Recommandation</h3>
              <p className="text-lg leading-relaxed">
                {scoreCompetitivite >= 60
                  ? `FidelAmi Santé est très compétitif face à ${selectedConcurrent}. Mettez en avant les ${analysis.pointsForts.length} points forts : flexibilité (sans engagement, sans limite d'âge) et absence de franchise.`
                  : scoreCompetitivite >= 40
                  ? `FidelAmi Santé est compétitif sur plusieurs aspects. Identifiez les besoins du client (prix, services, flexibilité) pour valoriser nos ${analysis.pointsForts.length} points forts.`
                  : `Face à ${selectedConcurrent}, concentrez-vous sur la différenciation : service client humain, transparence, sans engagement et accessibilité (sans limite d'âge).`}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <AlertCircle className="mx-auto text-blue-500 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Sélectionnez un concurrent
            </h3>
            <p className="text-gray-600 mb-6">
              Choisissez une assurance ci-dessus pour comparer avec FidelAmi Santé
            </p>
            <div className="bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-blue-900 font-medium">
                📌 Toutes les données sont vérifiées et officielles
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceComparator;