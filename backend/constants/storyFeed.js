import "dotenv/config";
import { connectDB } from "../db/db.js";
import { Story } from "../model/story.model.js";
import cloudinary from "../config/cloudinary.js";

const storyFeed = async () => {
  await connectDB();

  const slug = "akshay-journey";
  const exists = await Story.findOne({ slug });

  if (exists) {
    console.log("Already exists");
    process.exit(1);
  }

  const storyText = [
    "Akshay (Name) was born in a small town in India. Coming from a poor Familie (family), he understood hardship early. His father worked in a factory, and his Frau (mother) managed the home with limited means. But Akshay had a dream — to work abroad and give his family a better life.",
    "He became a Kranke-care expert — a nursing professional in a local hospital. Every day, he would sprechen (to speak) with patients, hören (to hear) their problems, notieren (note) symptoms, and ergänzen (add) reports. He learned to kennen (to know) many diseases and how to zuordnen (assign) the right treatment.",
    'One day, a Herr from Deutschland visited the hospital, wearing a fine Anzug (suit). He spoke Deutsch (German) fluently. Akshay asked, "Wie heißt das Medikament auf Deutsch?" The visitor smiled, impressed.',
    "From that day, Akshay decided to lernen (learn) Deutsch. He made a Tabelle (table) of new words, practiced buchstabieren (spell) them, and used a Telefon (phone) dictionary. He would schreiben (write) every new Wort (word) on paper, say it laut (aloud), and check ob (if) he could verstehen (understand) it.",
    "While eating his Butterbrot (buttered bread) at Frühstück (breakfast), Akshay watched German nursing videos on a Webseite (website). He learned polite phrases like danke (thanks), bitte (please), and Entschuldigung (sorry), and how to say Hallo, wie geht's? (Hello, how are you?), Tschüs (bye), and Bis bald (see you soon) to patients.",
    "Soon, he applied for a nursing job in Deutschland (Germany). The Interview was tough — they asked Fragen (questions) about patient care, medication, and teamwork. Akshay gave each Antwort (answer) clearly and professionally.",
    "When he arrived in Deutschland, his Hausnummer (house number), Postleitzahl (postal code), and E-Mail-Adresse (email address) were registered by his Partner at the agency. He started work in a German hospital, where he cared for Kranke (patients) with compassion.",
    "Akshay did not stop there. He came across opportunities for Spezialisierung (specialisation) in intensive care. After months of hard work and lernen (learning), he gained his certification, which allowed him to earn sehr (very) well.",
    "Within a few years, he had enough to buy his first apartment in Deutschland. Later, he bought more properties — some in Deutschland and some back in India. His investments grew, and his financial future became klar (clear) and secure.",
    "From a poor nurse in India to a highly qualified specialist in Germany with multiple properties, Akshay's life became proof that with gut (good) planning, dedication, and the courage to keep going, dreams do come true.",
  ].join("\n\n");

  const imageRes = await cloudinary.uploader.upload(
    "https://images.unsplash.com/photo-1551510438-c2dbb355cc6f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  const document = await Story.create({
    slug,
    title: "Akshay's Journey to Deutschland",
    description:
      "A nurse from India who learns Deutsch and builds a new life in Germany.",
    coverImageUrl: imageRes.secure_url,
    heroImageUrl: imageRes.secure_url,
    story: storyText,
  });

  console.log("Story seeded successfully!", document.title);
  process.exit(0);
};

storyFeed().catch((err) => {
  console.log("Error in seeding");
  process.exit(1);
});
