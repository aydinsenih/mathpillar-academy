import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { DEFAULT_COURSES } from "./default-courses";

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), "src/data/mathpillar.sqlite");

interface GlobalWithDb {
  _sqliteDb?: Database.Database;
}

const globalForDb = globalThis as unknown as GlobalWithDb;

function initDatabase(): Database.Database {
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      term TEXT NOT NULL,
      grade TEXT NOT NULL,
      startDate TEXT NOT NULL,
      schedule TEXT NOT NULL,
      hours INTEGER NOT NULL,
      price REAL NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      image TEXT,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      createdAt TEXT NOT NULL,
      studentData TEXT NOT NULL,
      parentData TEXT NOT NULL,
      addressData TEXT,
      courseIds TEXT NOT NULL,
      courses TEXT NOT NULL,
      totalPrice REAL NOT NULL,
      paymentMethod TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending'
    );

    CREATE TABLE IF NOT EXISTS instructors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      credentials TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT NOT NULL,
      tags TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      displayOrder INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);

  seedSettingsIfEmpty(db);
  seedCoursesIfEmpty(db);
  seedInstructorsIfEmpty(db);

  return db;
}

function seedSettingsIfEmpty(db: Database.Database): void {
  const insert = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
  insert.run("activeTerm", "Fall");
  insert.run("countdownTag", "Upcoming Term");
  insert.run("countdownTitle", "FALL COURSES");
  insert.run("countdownSubtitle", "STARTING SEPTEMBER 8, 2026");
  insert.run("countdownTargetDate", "2026-09-08T00:00:00");
}

function seedCoursesIfEmpty(db: Database.Database): void {
  const row = db.prepare("SELECT COUNT(*) as count FROM courses").get() as { count: number };
  if (row.count > 0) return;

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, title, subtitle, term, grade, startDate, schedule, hours, price, featured, active, image, description)
    VALUES (@id, @title, @subtitle, @term, @grade, @startDate, @schedule, @hours, @price, @featured, @active, @image, @description)
  `);

  const insertMany = db.transaction((courses: typeof DEFAULT_COURSES) => {
    for (const c of courses) {
      insertCourse.run({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle,
        term: c.term,
        grade: c.grade,
        startDate: c.startDate,
        schedule: c.schedule,
        hours: c.hours,
        price: c.price,
        featured: c.featured ? 1 : 0,
        active: c.active ? 1 : 0,
        image: c.image || null,
        description: c.description,
      });
    }
  });

  insertMany(DEFAULT_COURSES);
}

function seedInstructorsIfEmpty(db: Database.Database): void {
  const row = db.prepare("SELECT COUNT(*) as count FROM instructors").get() as { count: number };
  if (row.count > 0) return;

  const defaultInstructors = [
    {
      id: "inst-sinan-kanbir",
      name: "Dr. Sinan Kanbir",
      role: "Lead Mathematics Instructor & Founder",
      credentials: "Ph.D. in Mathematics Education",
      bio: "Author of prominent competition math curricula and problem-solving books. Over 20 years of experience mentoring USAMO and AIME qualifiers with proof-centered instruction.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      tags: JSON.stringify(["AMC 8/10/12", "Olympiad Geometry", "Curriculum Author"]),
      active: 1,
      displayOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: "inst-mansuri",
      name: "Dr. Mansuri",
      role: "Senior Faculty & Algebra Specialist",
      credentials: "Ph.D. in Applied Mathematics",
      bio: "Specialist in algebraic foundations, polynomial theory, and high school honors math curricula. Passionate about guiding middle schoolers through transition-to-algebra.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      tags: JSON.stringify(["Algebra 1 & 2", "Integrated Math", "MathCounts Coach"]),
      active: 1,
      displayOrder: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: "inst-elena-vance",
      name: "Prof. Elena Vance",
      role: "Elementary Math Specialist",
      credentials: "M.Ed. in STEM Curriculum & Instruction",
      bio: "Dedicated to sparking curiosity in grades 4–6 through visual geometry, pattern recognition, and building unshakable number sense early.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      tags: JSON.stringify(["Grades 4-5", "Number Fluency", "Visual Math"]),
      active: 1,
      displayOrder: 3,
      createdAt: new Date().toISOString(),
    },
  ];

  const insert = db.prepare(`
    INSERT INTO instructors (id, name, role, credentials, bio, image, tags, active, displayOrder, createdAt)
    VALUES (@id, @name, @role, @credentials, @bio, @image, @tags, @active, @displayOrder, @createdAt)
  `);

  const insertMany = db.transaction((list: typeof defaultInstructors) => {
    for (const inst of list) {
      insert.run(inst);
    }
  });

  insertMany(defaultInstructors);
}

export function getDb(): Database.Database {
  if (!globalForDb._sqliteDb) {
    globalForDb._sqliteDb = initDatabase();
  }
  return globalForDb._sqliteDb;
}
