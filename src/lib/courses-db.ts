import { getDb } from "./db";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  term: string; // "Spring" | "Fall" | "Summer"
  grade: string;
  startDate: string;
  schedule: string;
  hours: number;
  price: number;
  featured?: boolean;
  active: boolean;
  image?: string;
  description: string;
}

export interface StudentInfo {
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  phone: string;
  school: string;
  gpa: string;
  grade: string;
}

export interface ParentInfo {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Registration {
  id: string;
  createdAt: string;
  student: StudentInfo;
  parent: ParentInfo;
  address?: AddressInfo;
  courseIds: string[];
  courses: { id: string; title: string; price: number }[];
  totalPrice: number;
  paymentMethod: string;
  status: "Pending" | "Confirmed" | "Paid";
}

export interface AppSettings {
  activeTerm: string;
  countdownTag: string;
  countdownTitle: string;
  countdownSubtitle: string;
  countdownTargetDate: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  tags: string[];
  active: boolean;
  displayOrder: number;
  createdAt?: string;
}

interface CourseRow {
  id: string;
  title: string;
  subtitle: string;
  term: string;
  grade: string;
  startDate: string;
  schedule: string;
  hours: number;
  price: number;
  featured: number;
  active: number;
  image: string | null;
  description: string;
}

interface RegistrationRow {
  id: string;
  createdAt: string;
  studentData: string;
  parentData: string;
  addressData: string | null;
  courseIds: string;
  courses: string;
  totalPrice: number;
  paymentMethod: string;
  status: "Pending" | "Confirmed" | "Paid";
}

function mapCourse(row: CourseRow): Course {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    term: row.term,
    grade: row.grade,
    startDate: row.startDate,
    schedule: row.schedule,
    hours: row.hours,
    price: row.price,
    featured: Boolean(row.featured),
    active: Boolean(row.active),
    image: row.image ?? undefined,
    description: row.description,
  };
}

function mapRegistration(row: RegistrationRow): Registration {
  return {
    id: row.id,
    createdAt: row.createdAt,
    student: JSON.parse(row.studentData) as StudentInfo,
    parent: JSON.parse(row.parentData) as ParentInfo,
    address: row.addressData ? (JSON.parse(row.addressData) as AddressInfo) : undefined,
    courseIds: JSON.parse(row.courseIds) as string[],
    courses: JSON.parse(row.courses) as { id: string; title: string; price: number }[],
    totalPrice: row.totalPrice,
    paymentMethod: row.paymentMethod,
    status: row.status,
  };
}

interface InstructorRow {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  tags: string;
  active: number;
  displayOrder: number;
  createdAt: string;
}

function mapInstructor(row: InstructorRow): Instructor {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tags);
    if (!Array.isArray(tags)) tags = [];
  } catch {
    tags = [];
  }
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    credentials: row.credentials,
    bio: row.bio,
    image: row.image,
    tags,
    active: Boolean(row.active),
    displayOrder: row.displayOrder,
    createdAt: row.createdAt,
  };
}

// --- Settings Operations ---

export async function getSettings(): Promise<AppSettings> {
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM settings").all() as {
    key: string;
    value: string;
  }[];
  const map: Record<string, string> = {};
  for (const r of rows) {
    map[r.key] = r.value;
  }

  return {
    activeTerm: map.activeTerm || "Fall",
    countdownTag: map.countdownTag || "Upcoming Term",
    countdownTitle: map.countdownTitle || "FALL COURSES",
    countdownSubtitle: map.countdownSubtitle || "STARTING SEPTEMBER 8, 2026",
    countdownTargetDate: map.countdownTargetDate || "2026-09-08T00:00:00",
  };
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const db = getDb();
  const insertOrReplace = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");

  const current = await getSettings();
  const updated: AppSettings = {
    ...current,
    ...settings,
  };

  const runAll = db.transaction((s: AppSettings) => {
    if (s.activeTerm !== undefined) insertOrReplace.run("activeTerm", s.activeTerm);
    if (s.countdownTag !== undefined) insertOrReplace.run("countdownTag", s.countdownTag);
    if (s.countdownTitle !== undefined) insertOrReplace.run("countdownTitle", s.countdownTitle);
    if (s.countdownSubtitle !== undefined)
      insertOrReplace.run("countdownSubtitle", s.countdownSubtitle);
    if (s.countdownTargetDate !== undefined)
      insertOrReplace.run("countdownTargetDate", s.countdownTargetDate);
  });

  runAll(updated);
  return updated;
}

export async function getActiveTerm(): Promise<string> {
  const settings = await getSettings();
  return settings.activeTerm || "Fall";
}

export async function setActiveTerm(activeTerm: string): Promise<string> {
  await saveSettings({ activeTerm });
  return activeTerm;
}

// --- Courses Operations ---

export async function getCourses(): Promise<Course[]> {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM courses").all() as CourseRow[];
  return rows.map(mapCourse);
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const db = getDb();
  const row = db.prepare("SELECT * FROM courses WHERE id = ?").get(id) as CourseRow | undefined;
  return row ? mapCourse(row) : undefined;
}

export async function saveCourses(courses: Course[]): Promise<void> {
  const db = getDb();
  const upsert = db.prepare(`
    INSERT INTO courses (id, title, subtitle, term, grade, startDate, schedule, hours, price, featured, active, image, description)
    VALUES (@id, @title, @subtitle, @term, @grade, @startDate, @schedule, @hours, @price, @featured, @active, @image, @description)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      subtitle = excluded.subtitle,
      term = excluded.term,
      grade = excluded.grade,
      startDate = excluded.startDate,
      schedule = excluded.schedule,
      hours = excluded.hours,
      price = excluded.price,
      featured = excluded.featured,
      active = excluded.active,
      image = excluded.image,
      description = excluded.description
  `);

  const runAll = db.transaction((list: Course[]) => {
    for (const c of list) {
      upsert.run({
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
        active: c.active !== false ? 1 : 0,
        image: c.image || null,
        description: c.description,
      });
    }
  });

  runAll(courses);
}

export async function createCourse(
  newCourse: Omit<Course, "id"> & { id?: string },
): Promise<Course> {
  const db = getDb();
  const id = newCourse.id || `c${Date.now().toString().slice(-4)}`;
  const course: Course = {
    ...newCourse,
    id,
    active: newCourse.active !== undefined ? newCourse.active : true,
  };

  db.prepare(`
    INSERT INTO courses (id, title, subtitle, term, grade, startDate, schedule, hours, price, featured, active, image, description)
    VALUES (@id, @title, @subtitle, @term, @grade, @startDate, @schedule, @hours, @price, @featured, @active, @image, @description)
  `).run({
    id: course.id,
    title: course.title,
    subtitle: course.subtitle,
    term: course.term,
    grade: course.grade,
    startDate: course.startDate,
    schedule: course.schedule,
    hours: course.hours,
    price: course.price,
    featured: course.featured ? 1 : 0,
    active: course.active ? 1 : 0,
    image: course.image || null,
    description: course.description,
  });

  return course;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const existing = await getCourseById(id);
  if (!existing) return null;

  const db = getDb();
  const merged: Course = {
    ...existing,
    ...updates,
    id,
  };

  db.prepare(`
    UPDATE courses SET
      title = @title,
      subtitle = @subtitle,
      term = @term,
      grade = @grade,
      startDate = @startDate,
      schedule = @schedule,
      hours = @hours,
      price = @price,
      featured = @featured,
      active = @active,
      image = @image,
      description = @description
    WHERE id = @id
  `).run({
    id: merged.id,
    title: merged.title,
    subtitle: merged.subtitle,
    term: merged.term,
    grade: merged.grade,
    startDate: merged.startDate,
    schedule: merged.schedule,
    hours: merged.hours,
    price: merged.price,
    featured: merged.featured ? 1 : 0,
    active: merged.active ? 1 : 0,
    image: merged.image || null,
    description: merged.description,
  });

  return merged;
}

export async function deleteCourse(id: string): Promise<boolean> {
  const db = getDb();
  const info = db.prepare("DELETE FROM courses WHERE id = ?").run(id);
  return info.changes > 0;
}

// --- Registrations Operations ---

export async function getRegistrations(): Promise<Registration[]> {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM registrations ORDER BY datetime(createdAt) DESC")
    .all() as RegistrationRow[];
  return rows.map(mapRegistration);
}

export async function saveRegistrations(regs: Registration[]): Promise<void> {
  const db = getDb();
  const updateStmt = db.prepare("UPDATE registrations SET status = ? WHERE id = ?");
  const runAll = db.transaction((list: Registration[]) => {
    for (const r of list) {
      updateStmt.run(r.status, r.id);
    }
  });
  runAll(regs);
}

export async function updateRegistrationStatus(
  id: string,
  status: "Pending" | "Confirmed" | "Paid",
): Promise<boolean> {
  const db = getDb();
  const info = db.prepare("UPDATE registrations SET status = ? WHERE id = ?").run(status, id);
  return info.changes > 0;
}

export async function createRegistration(
  regData: Omit<Registration, "id" | "createdAt" | "status">,
): Promise<Registration> {
  const db = getDb();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newReg: Registration = {
    ...regData,
    id: `REG-2026-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  db.prepare(`
    INSERT INTO registrations (id, createdAt, studentData, parentData, addressData, courseIds, courses, totalPrice, paymentMethod, status)
    VALUES (@id, @createdAt, @studentData, @parentData, @addressData, @courseIds, @courses, @totalPrice, @paymentMethod, @status)
  `).run({
    id: newReg.id,
    createdAt: newReg.createdAt,
    studentData: JSON.stringify(newReg.student),
    parentData: JSON.stringify(newReg.parent),
    addressData: newReg.address ? JSON.stringify(newReg.address) : null,
    courseIds: JSON.stringify(newReg.courseIds),
    courses: JSON.stringify(newReg.courses),
    totalPrice: newReg.totalPrice,
    paymentMethod: newReg.paymentMethod,
    status: newReg.status,
  });

  return newReg;
}

// --- Instructors Operations ---

export async function getInstructors(includeInactive = false): Promise<Instructor[]> {
  const db = getDb();
  let rows: InstructorRow[];
  if (includeInactive) {
    rows = db
      .prepare("SELECT * FROM instructors ORDER BY displayOrder ASC, createdAt ASC")
      .all() as InstructorRow[];
  } else {
    rows = db
      .prepare(
        "SELECT * FROM instructors WHERE active = 1 ORDER BY displayOrder ASC, createdAt ASC",
      )
      .all() as InstructorRow[];
  }
  return rows.map(mapInstructor);
}

export async function getInstructorById(id: string): Promise<Instructor | undefined> {
  const db = getDb();
  const row = db.prepare("SELECT * FROM instructors WHERE id = ?").get(id) as
    | InstructorRow
    | undefined;
  return row ? mapInstructor(row) : undefined;
}

export async function createInstructor(
  data: Omit<Instructor, "id" | "createdAt"> & { id?: string },
): Promise<Instructor> {
  const db = getDb();
  const id = data.id || `inst-${Date.now().toString().slice(-6)}`;
  const createdAt = new Date().toISOString();
  const instructor: Instructor = {
    ...data,
    id,
    active: data.active !== undefined ? data.active : true,
    displayOrder: data.displayOrder ?? 0,
    createdAt,
  };

  db.prepare(`
    INSERT INTO instructors (id, name, role, credentials, bio, image, tags, active, displayOrder, createdAt)
    VALUES (@id, @name, @role, @credentials, @bio, @image, @tags, @active, @displayOrder, @createdAt)
  `).run({
    id: instructor.id,
    name: instructor.name,
    role: instructor.role,
    credentials: instructor.credentials || "",
    bio: instructor.bio || "",
    image: instructor.image || "",
    tags: JSON.stringify(instructor.tags || []),
    active: instructor.active ? 1 : 0,
    displayOrder: instructor.displayOrder,
    createdAt: instructor.createdAt,
  });

  return instructor;
}

export async function updateInstructor(
  id: string,
  updates: Partial<Instructor>,
): Promise<Instructor | null> {
  const existing = await getInstructorById(id);
  if (!existing) return null;

  const db = getDb();
  const merged: Instructor = {
    ...existing,
    ...updates,
    id,
  };

  db.prepare(`
    UPDATE instructors SET
      name = @name,
      role = @role,
      credentials = @credentials,
      bio = @bio,
      image = @image,
      tags = @tags,
      active = @active,
      displayOrder = @displayOrder
    WHERE id = @id
  `).run({
    id: merged.id,
    name: merged.name,
    role: merged.role,
    credentials: merged.credentials || "",
    bio: merged.bio || "",
    image: merged.image || "",
    tags: JSON.stringify(merged.tags || []),
    active: merged.active ? 1 : 0,
    displayOrder: merged.displayOrder,
  });

  return merged;
}

export async function deleteInstructor(id: string): Promise<boolean> {
  const db = getDb();
  const info = db.prepare("DELETE FROM instructors WHERE id = ?").run(id);
  return info.changes > 0;
}

// --- Auth Utilities ---
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@mathpillar.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export const ADMIN_SESSION_KEY = "mp_admin_session";
export const ADMIN_SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || "mp_auth_secret_token_2026";
