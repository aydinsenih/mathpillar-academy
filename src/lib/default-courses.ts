export interface InitialCourseSeed {
  id: string;
  title: string;
  subtitle: string;
  term: string;
  grade: string;
  startDate: string;
  schedule: string;
  hours: number;
  price: number;
  featured: boolean;
  active: boolean;
  image: string;
  description: string;
}

export const DEFAULT_COURSES: InitialCourseSeed[] = [
  {
    id: "c61",
    title: "GEOTOPIA 0.5",
    subtitle: "High School Geometry Foundations",
    term: "Spring",
    grade: "Grade 8-10",
    startDate: "February 3, 2026",
    schedule: "Tuesdays & Thursdays 6:00 - 7:15 PM (CT)",
    hours: 15,
    price: 450,
    featured: true,
    active: true,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    description:
      "Foundational high school geometry covering Euclidean proofs, triangle congruence, quadrilaterals, similarity, and circle theorems with interactive problem solving.",
  },
  {
    id: "c58",
    title: "GRADE 4 & 5",
    subtitle: "Elementary Math Support & Number Fluency",
    term: "Spring",
    grade: "Grade 4-5",
    startDate: "February 6, 2026",
    schedule: "Mondays 6:00 - 7:00 PM (CT)",
    hours: 12,
    price: 380,
    featured: true,
    active: true,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    description:
      "12-week enrichment focusing on number sense, mental math tricks, fractions, basic geometry, and building strong mathematical intuition early.",
  },
  {
    id: "c40",
    title: "OUT OF THE BOX ALGEBRA",
    subtitle: "Integrated Algebra 1 & Algebra 2 Book Study",
    term: "Spring",
    grade: "Grade 8-10",
    startDate: "February 7, 2026",
    schedule: "Saturdays 10:00 - 11:30 AM (CT)",
    hours: 18,
    price: 520,
    featured: false,
    active: true,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description:
      "Deep dive into integrated algebra through non-traditional problem solving, functional relationships, polynomials, and challenging contest-style questions.",
  },
  {
    id: "c51",
    title: "ALGEBRA 2 HONORS",
    subtitle: "Weekly School Support & Exam Prep",
    term: "Spring",
    grade: "Grade 9-11",
    startDate: "February 4, 2026",
    schedule: "Wednesdays 6:00 - 7:30 PM (CT)",
    hours: 18,
    price: 520,
    featured: false,
    active: true,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    description:
      "Comprehensive support for high school Algebra 2 curriculum, covering advanced polynomials, logarithms, complex numbers, and pre-calculus readiness.",
  },
  {
    id: "c60",
    title: "GRADE 6 TRANSITION TO ALGEBRA",
    subtitle: "Middle School Bridge & Pre-Algebra",
    term: "Spring",
    grade: "Grade 5-6",
    startDate: "February 4, 2026",
    schedule: "Wednesdays 6:30 - 7:45 PM (CT)",
    hours: 15,
    price: 420,
    featured: false,
    active: true,
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    description:
      "Designed for motivated 5th and 6th graders transitioning from arithmetic to symbolic algebra, linear equations, ratios, and logical deduction.",
  },
  {
    id: "c71",
    title: "AMC 8 / 10 FALL MASTERY",
    subtitle: "Comprehensive Contest Tactics & Problem Solving",
    term: "Fall",
    grade: "Grade 6-9",
    startDate: "September 8, 2026",
    schedule: "Tuesdays 6:00 - 7:30 PM (CT)",
    hours: 18,
    price: 540,
    featured: true,
    active: true,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description:
      "Targeted competition prep focusing on number theory, combinatorial counting, probability, and advanced geometry for the AMC 8/10 exams.",
  },
  {
    id: "c72",
    title: "FALL PRE-CALCULUS & TRIG",
    subtitle: "Rigorous Functions, Vectors & Analytic Geometry",
    term: "Fall",
    grade: "Grade 10-12",
    startDate: "September 10, 2026",
    schedule: "Thursdays 6:00 - 7:45 PM (CT)",
    hours: 18,
    price: 560,
    featured: true,
    active: true,
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    description:
      "Accelerated study of trigonometric identities, parametric equations, polar coordinates, and limit concepts designed for advanced STEM students.",
  },
];
