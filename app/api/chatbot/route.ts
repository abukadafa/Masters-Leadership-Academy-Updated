import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Embedded Intelligent Academy Knowledge Base
function getOfflineAnswer(query: string, isFrench: boolean): string {
  const q = query.toLowerCase();

  // 1. Office Location & Contact
  if (
    q.includes("where") ||
    q.includes("address") ||
    q.includes("office") ||
    q.includes("location") ||
    q.includes("abuja") ||
    q.includes("utako") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("call") ||
    q.includes("adresse") ||
    q.includes("bureau") ||
    q.includes("téléphone") ||
    q.includes("joindre")
  ) {
    if (isFrench) {
      return (
        "Le siège de Masters Leadership Academy est situé au 36 Moses Majekodunmi Street, Utako, Abuja, FCT, Nigeria. " +
        "Vous pouvez nous contacter directement par téléphone au +234 811 464 6340 ou par e-mail à mastersleadershipacademy@gmail.com. " +
        "Vous pouvez également soumettre une demande via notre page Contact (/contact)."
      );
    }
    return (
      "Masters Leadership Academy's corporate office is located at 36 Moses Majekodunmi Street, Utako, Abuja, FCT, Nigeria. " +
      "You can reach our executive team directly via phone at +234 811 464 6340 or by email at mastersleadershipacademy@gmail.com. " +
      "You can also submit an official enquiry through our Contact page (/contact)."
    );
  }

  // 2. Leadership & Faculty
  if (
    q.includes("who") ||
    q.includes("leader") ||
    q.includes("founder") ||
    q.includes("chairman") ||
    q.includes("faculty") ||
    q.includes("team") ||
    q.includes("godwin") ||
    q.includes("ediae") ||
    q.includes("aikowe") ||
    q.includes("okoisama") ||
    q.includes("président") ||
    q.includes("fondateur") ||
    q.includes("équipe") ||
    q.includes("direction")
  ) {
    if (isFrench) {
      return (
        "L'Académie est dirigée par un Conseil de Direction éminent présidé par le Dr Orovwiroro O. Godwin, FIMC, CMC (Fondateur & Président). " +
        "Le conseil comprend également l'Ing. Festus Ediae, FNSE (Directeur Technique), l'Ing. Joseph Aikowe, MNSE, COREN (Directeur des Opérations Commerciales & Conseil Technique), " +
        "et le Dr Thomas Chinye Okoisama, FIMC, CMC, DBA (Directeur de la Recherche). Consultez leurs dossiers complets sur /leadership."
      );
    }
    return (
      "The Academy is led by an executive council chaired by Dr. Orovwiroro O. Godwin, FIMC, CMC (Founder & Chairman). " +
      "Our leadership council also includes Engr. Festus Ediae, FNSE (Technical Director), Engr. Joseph Aikowe, MNSE, COREN (Director of Commercial Operations & Technical Advisory), " +
      "and Dr. Thomas Chinye Okoisama, FIMC, CMC, DBA (Director of Research). You can review their full profiles at /leadership."
    );
  }

  // 3. Programmes, Seminars & Cohorts
  if (
    q.includes("programme") ||
    q.includes("program") ||
    q.includes("seminar") ||
    q.includes("conference") ||
    q.includes("cohort") ||
    q.includes("course") ||
    q.includes("event") ||
    q.includes("calendar") ||
    q.includes("webinar") ||
    q.includes("retreat") ||
    q.includes("séminaire") ||
    q.includes("formation") ||
    q.includes("conférence")
  ) {
    if (isFrench) {
      return (
        "Les inscriptions aux Séminaires pour Cadres & Cohortes 2026/2027 sont actuellement ouvertes. " +
        "Nous proposons des séminaires stratégiques de gouvernance, des sommets panafricains, des retraites d'entreprise et des webinaires mensuels. " +
        "Explorez le calendrier complet de nos programmes sur /programmes et /events."
      );
    }
    return (
      "Enrollment for our 2026/2027 Executive Seminars & Cohorts is currently open. " +
      "Our offerings include Executive Governance Seminars, Pan-African Leadership Summits, Corporate Board Retreats, and Monthly Webinars. " +
      "Explore the full syllabus and dates on our Programmes (/programmes) and Events (/events) pages."
    );
  }

  // 4. Registration & Enrollment
  if (
    q.includes("register") ||
    q.includes("apply") ||
    q.includes("enrol") ||
    q.includes("fee") ||
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("admission") ||
    q.includes("inscri") ||
    q.includes("tarif") ||
    q.includes("coût") ||
    q.includes("prix")
  ) {
    if (isFrench) {
      return (
        "Vous pouvez vous inscrire à nos séminaires ou rejoindre la liste d'intérêt de nos cohortes directement sur notre page Inscription (/register). " +
        "Pour des programmes personnalisés ou la formation d'équipes entières, remplissez le formulaire de conseil d'entreprise sur /corporate-training."
      );
    }
    return (
      "You can register for upcoming seminars or join our cohort interest list directly on our Participant Registration portal (/register). " +
      "For customized in-house institutional cohorts or corporate team discounts, please submit an enquiry on /corporate-training."
    );
  }

  // 5. Corporate Training & Technical Advisory
  if (
    q.includes("corporate") ||
    q.includes("training") ||
    q.includes("advisory") ||
    q.includes("board") ||
    q.includes("consult") ||
    q.includes("custom") ||
    q.includes("conseil") ||
    q.includes("entreprise")
  ) {
    if (isFrench) {
      return (
        "Nous proposons des services de conseil technique et des formations sur mesure pour les conseils d'administration, les institutions publiques et les cadres dirigeants du secteur de l'énergie et des services publics. " +
        "Découvrez nos solutions institutionnelles sur /corporate-training ou /services."
      );
    }
    return (
      "We provide tailored corporate advisory, executive board retreats, and technical diagnostics for corporate institutions and public utilities. " +
      "Learn more about our enterprise interventions and request an institutional consultation at /corporate-training."
    );
  }

  // 6. Certificate Verification
  if (
    q.includes("certificate") ||
    q.includes("verify") ||
    q.includes("certificat") ||
    q.includes("vérifi") ||
    q.includes("authent")
  ) {
    if (isFrench) {
      return (
        "Pour vérifier l'authenticité d'un certificat délivré par Masters Leadership Academy, veuillez utiliser notre portail officiel de vérification sur /verify-certificate."
      );
    }
    return (
      "To verify the authenticity of any credential issued by Masters Leadership Academy, please visit our official certificate verification portal at /verify-certificate."
    );
  }

  // 7. Accreditation, Legal & CAC
  if (
    q.includes("cac") ||
    q.includes("reg") ||
    q.includes("legal") ||
    q.includes("accredit") ||
    q.includes("statut") ||
    q.includes("légal")
  ) {
    if (isFrench) {
      return (
        "Masters Leadership Academy est légalement enregistrée auprès de la Corporate Affairs Commission (CAC) du Nigeria sous le numéro BN 2357164 (CRBN 635769) en vertu de la loi sur les sociétés de 1990. " +
        "Tous les détails d'enregistrement sont disponibles sur /about."
      );
    }
    return (
      "Masters Leadership Academy is a legally registered Business Name with the Corporate Affairs Commission (CAC) of Nigeria, registration number BN 2357164, CRBN 635769, pursuant to the Companies and Allied Matters Act 1990. " +
      "Learn more on our About page (/about)."
    );
  }

  // 8. Donations & Partnerships
  if (
    q.includes("donate") ||
    q.includes("partner") ||
    q.includes("sponsor") ||
    q.includes("don") ||
    q.includes("partenariat") ||
    q.includes("parrain")
  ) {
    if (isFrench) {
      return (
        "Vous pouvez soutenir les initiatives éducatives de l'Académie sur /donate, ou explorer nos opportunités de partenariat et de parrainage institutionnel sur /partnerships."
      );
    }
    return (
      "You can support the Academy's leadership development initiatives through our secure donation portal (/donate) or explore institutional collaboration opportunities on /partnerships."
    );
  }

  // Default Greeting / Overview
  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey") ||
    q.includes("bonjour") ||
    q.includes("salut") ||
    q.includes("help") ||
    q.includes("aide")
  ) {
    if (isFrench) {
      return (
        "Bonjour ! Je suis le conseiller virtuel de Masters Leadership Academy. " +
        "Comment puis-je vous aider aujourd'hui concernant nos séminaires, nos formations pour cadres, notre bureau à Utako (Abuja) ou les inscriptions ?"
      );
    }
    return (
      "Hello! I am the Masters Leadership Academy advisory assistant. " +
      "How can I assist you today regarding our executive seminars, corporate advisory, Utako Abuja office, or cohort registrations?"
    );
  }

  // Fallback
  if (isFrench) {
    return (
      "Masters Leadership Academy forme les dirigeants et institutions avec des cadres décisionnels et des séminaires stratégiques. " +
      "Pour toute question spécifique, n'hésitez pas à nous contacter directement au +234 811 464 6340, par e-mail à mastersleadershipacademy@gmail.com, ou via /contact."
    );
  }
  return (
    "Masters Leadership Academy equips corporate executives and public sector leaders with diagnostic decision frameworks and executive seminars. " +
    "For specific enquiries or customized advisory proposals, please reach our team at +234 811 464 6340, email mastersleadershipacademy@gmail.com, or visit /contact."
  );
}

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "chatbot", { limit: 30, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  let body: { messages?: ChatMessage[]; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const latestMessage = messages[messages.length - 1]?.content || "";
  const isFrench =
    body.locale === "fr" ||
    /\b(bonjour|salut|merci|comment|où|quel|quelle|séminaire|formation|cadre|prix|inscription)\b/i.test(
      latestMessage
    );

  // If Anthropic API key is provided, try calling Claude
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 400,
          system:
            "You are the executive assistant for Masters Leadership Academy in Utako, Abuja. Be concise, polite, and helpful.",
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.content?.find((b: { type: string; text?: string }) => b.type === "text")?.text;
        if (text) {
          return NextResponse.json({ reply: text });
        }
      }
    } catch {
      // Fallback seamlessly to embedded engine
    }
  }

  // Instant, reliable, 100% active knowledge engine response
  const reply = getOfflineAnswer(latestMessage, isFrench);
  return NextResponse.json({ reply });
}
