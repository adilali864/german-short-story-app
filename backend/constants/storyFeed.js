import "dotenv/config";
import { connectDB } from "../db/db.js";
import { Story } from "../model/story.model.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stories = [
  {
    slug: "akshay-journey",
    title: "Akshay's Journey to Deutschland",
    description:
      "A nurse from India who learns Deutsch and builds a new life in Germany.",
    image: "akshay.png",
    paragraphs: [
      "Akshay was born in a small town in India. Coming from a poor Familie (family), he understood hardship early. His father worked in a factory, and his Frau (mother) managed the home with limited means.",
      "He became a Kranke-care expert — a nursing professional in a local hospital. Every day, he would sprechen (to speak) with patients, hören (to hear) their problems, notieren (note) symptoms, and ergänzen (add) reports.",
      "One day, a Herr (gentleman) from Deutschland visited the hospital wearing an elegant Anzug (suit). He spoke Deutsch (German) fluently.",
      "From that day, Akshay decided to lernen (learn) Deutsch. He made a Tabelle (table) of new words and used a Telefon (phone) dictionary.",
      "Soon, he applied for a position in Deutschland (Germany). The Interview was tough, but Akshay answered every Frage (question) clearly.",
      "He finally moved to Deutschland, where his Hausnummer (house number) and Postleitzahl (postal code) were registered by the agency.",
      "Akshay worked hard, completed a Spezialisierung (specialisation), and earned sehr (very) well.",
    ],
  },

  {
    slug: "maria-first-day",
    title: "Maria's First Day in the Krankenhaus",
    description:
      "Maria starts her nursing job in a German hospital and learns important German words.",
    image: "maria.png",
    paragraphs: [
      "Maria arrived at the Krankenhaus (hospital) full of excitement. She greeted everyone with a polite Guten (good) Morgen (morning).",
      "Her supervisor, a freundliche (friendly) Schwester (nurse), welcomed her warmly.",
      "During her rounds, Maria checked Patientenakten (records) and ensured every Medikament (medicine) was correct.",
      'A patient asked, "Wasser (water), bitte (please)?" Maria smiled and replied, "Natürlich (of course)."',
      "At lunchtime, she ate a fresh Salat (salad) in the Kantine (canteen) and talked about her Heimat (home).",
      "By evening, Maria felt müde (tired) but glücklich (happy). She had survived her first day!",
    ],
  },

  {
    slug: "rahul-train-journey",
    title: "Rahul's Train Journey Across Germany",
    description:
      "Rahul travels across Germany and learns useful travel vocabulary along the way.",
    image: "rahul.png",
    paragraphs: [
      "Rahul boarded the Zug (train) in Berlin and found his Sitzplatz (seat) while looking out of the Fenster (window).",
      'When the Schaffner (conductor) arrived, Rahul said, "Hier (here) ist mein Ticket (ticket)."',
      "He enjoyed the schöne (beautiful) Landschaft (landscape) and the Ruhe (quiet) inside the cabin.",
      "At Leipzig station, a Durchsage (announcement) said the Zug (train) had a small Verspätung (delay).",
      "Rahul bought a Brezel (pretzel) and a Kaffee (coffee) while waiting.",
      "His Reise (journey) was lang (long) but wunderschön (beautiful), and he promised to travel more.",
    ],
  },
];

const storyFeed = async () => {
  await connectDB();

  for (const s of stories) {
    const exists = await Story.findOne({ slug: s.slug });

    if (exists) {
      console.log(`${s.slug} already exists. Skipping...`);
      continue;
    }

    const absoluteImagePath = path.resolve(__dirname, "../public", s.image);

    const imageRes = await cloudinary.uploader.upload(absoluteImagePath);

    const storyText = s.paragraphs.join("\n\n");

    const document = await Story.create({
      slug: s.slug,
      title: s.title,
      description: s.description,
      coverImageUrl: imageRes.secure_url,
      heroImageUrl: imageRes.secure_url,
      story: storyText,
    });

    console.log(`Seeded: ${document.title}`);
  }

  console.log("All stories seeded!");
  process.exit(0);
};

storyFeed().catch((error) => {
  console.error("Error in seeding", error);
  process.exit(1);
});
