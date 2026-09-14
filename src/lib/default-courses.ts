export interface CurriculumItemSeed {
  id: string;
  unit: string;
  topic: string;
  objectives: string;
  hours?: string;
}

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
  detailedDescription?: string;
  curriculum?: CurriculumItemSeed[];
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
    detailedDescription:
      "GEOTOPIA 0.5 is an intensive, proof-centered geometry foundation course designed to bridge middle school intuition with rigorous high school Euclidean geometry. Students move beyond rote formula memorization to constructing formal direct and indirect mathematical proofs.\n\nTaught in our dedicated physical academy classrooms, students practice extensive whiteboard deductions, compass-and-straightedge constructions, and contest-level problem solving under direct faculty supervision.",
    curriculum: [
      {
        id: "geo-w1",
        unit: "Week 1",
        topic: "Foundations of Euclidean Proofs & Axiomatic Systems",
        objectives:
          "Undefined terms (point, line, plane), postulates vs. theorems, segment & angle addition, and introductory two-column deduction.",
        hours: "2.5 hrs",
      },
      {
        id: "geo-w2",
        unit: "Week 2",
        topic: "Parallel Lines & Angle Chasing",
        objectives:
          "Alternate interior, corresponding, and consecutive interior angles; transversal proofs; auxiliary lines in complex polygon angle determinations.",
        hours: "2.5 hrs",
      },
      {
        id: "geo-w3",
        unit: "Week 3",
        topic: "Triangle Congruence & Isosceles Theorems",
        objectives:
          "Rigorous proofs using SSS, SAS, ASA, AAS, and HL criteria; CPCTC applications; properties of medians, altitudes, and perpendicular bisectors.",
        hours: "2.5 hrs",
      },
      {
        id: "geo-w4",
        unit: "Week 4",
        topic: "Quadrilaterals & Coordinate Geometry Integration",
        objectives:
          "Classifying parallelograms, rhombi, kites, and trapezoids; coordinate proofs using midpoint, distance, and slope formulas.",
        hours: "2.5 hrs",
      },
      {
        id: "geo-w5",
        unit: "Week 5",
        topic: "Similarity, Dilations & Power of a Point",
        objectives:
          "AA, SAS, and SSS similarity theorems; geometric mean in right triangles; introductory intersecting chord and secant theorems.",
        hours: "2.5 hrs",
      },
      {
        id: "geo-w6",
        unit: "Week 6",
        topic: "Circle Theorems, Inscribed Angles & Synthesis Lab",
        objectives:
          "Central, inscribed, and tangent-chord angles; cyclic quadrilaterals; comprehensive contest geometry problem set and proof review.",
        hours: "2.5 hrs",
      },
    ],
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
    detailedDescription:
      "This elementary enrichment cohort nurtures natural curiosity and instills deep computational confidence in 4th and 5th graders. Rather than repetitive drill worksheets, students explore mathematical patterns, hands-on visual representations of fractions and decimals, and competitive math puzzles (Math Kangaroo and MOEMS style).\n\nIn our small in-person classroom environment, every student receives individualized attention and encouragement to articulate their mathematical thinking out loud.",
    curriculum: [
      {
        id: "elem-w1",
        unit: "Week 1",
        topic: "Number Sense, Place Value & Rapid Mental Math",
        objectives:
          "Mastering mental multiplication strategies, estimation tactics, order of operations, and distributive property visualization.",
        hours: "2 hrs",
      },
      {
        id: "elem-w2",
        unit: "Week 2",
        topic: "Factors, Multiples & Prime Factorization Trees",
        objectives:
          "Finding GCF and LCM with prime factorization; divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, and 11.",
        hours: "2 hrs",
      },
      {
        id: "elem-w3",
        unit: "Week 3",
        topic: "Fraction Mastery & Visual Representations",
        objectives:
          "Adding and subtracting unlike fractions; equivalent fraction reasoning; converting improper fractions and mixed numbers visually.",
        hours: "2 hrs",
      },
      {
        id: "elem-w4",
        unit: "Week 4",
        topic: "Fractions Multiplication, Division & Real-World Word Problems",
        objectives:
          "Multiplying fractions; reciprocal concepts for fraction division; solving multi-step bar model word problems.",
        hours: "2 hrs",
      },
      {
        id: "elem-w5",
        unit: "Week 5",
        topic: "Decimals, Percentages & Spatial Perimeter/Area",
        objectives:
          "Decimal-fraction-percent equivalents; calculating perimeter and area of composite rectilinear shapes; unit conversions.",
        hours: "2 hrs",
      },
      {
        id: "elem-w6",
        unit: "Week 6",
        topic: "Logic Puzzles, Patterns & Math Olympiad Readiness",
        objectives:
          "Venn diagrams, sequence patterns, working backwards, and introductory MOEMS contest problems with collaborative group boardwork.",
        hours: "2 hrs",
      },
    ],
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
    detailedDescription:
      "Out of the Box Algebra is created for motivated students who want to go far beyond standard school textbooks. This seminar-style book study bridges foundational Algebra 1 with advanced Algebra 2 concepts using elegant, non-routine problem sets.\n\nStudents explore polynomial identities, algebraic symmetries, functional equations, and contest-style systems of equations through rigorous boardwork and peer discussions.",
    curriculum: [
      {
        id: "alg-w1",
        unit: "Week 1",
        topic: "Algebraic Symmetries & Non-Standard Factoring",
        objectives:
          "Difference and sum of cubes, Simon's Favorite Factoring Trick (SFFT), grouped factorization, and symmetrical polynomials.",
        hours: "3 hrs",
      },
      {
        id: "alg-w2",
        unit: "Week 2",
        topic: "Quadratic Theory, Discriminants & Vieta's Formulas",
        objectives:
          "Relating roots and coefficients in quadratic equations; symmetric polynomial expressions involving roots; maximum/minimum word problems.",
        hours: "3 hrs",
      },
      {
        id: "alg-w3",
        unit: "Week 3",
        topic: "Higher-Degree Polynomials & Division Algorithms",
        objectives:
          "Remainder and Factor Theorems, rational root theorem, synthetic division, Vieta's formulas for cubics and quartics.",
        hours: "3 hrs",
      },
      {
        id: "alg-w4",
        unit: "Week 4",
        topic: "Radicals, Exponents & Complex Numbers",
        objectives:
          "Denesting radical expressions; rationalizing complex denominators; geometric and algebraic properties of imaginary numbers.",
        hours: "3 hrs",
      },
      {
        id: "alg-w5",
        unit: "Week 5",
        topic: "Systems of Non-Linear Equations & Invertible Functions",
        objectives:
          "Solving symmetrical non-linear systems; inverse functions, domain/range constraints, and composition properties.",
        hours: "3 hrs",
      },
      {
        id: "alg-w6",
        unit: "Week 6",
        topic: "Inequalities (AM-GM, Cauchy-Schwarz) & Competition Capstone",
        objectives:
          "Introduction to algebraic inequalities; applying AM-GM to optimization problems; full contest-style problem solving examination.",
        hours: "3 hrs",
      },
    ],
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
    detailedDescription:
      "Designed specifically for high school honors students aiming for top marks in their school coursework and semester exams. We demystify abstract algebraic concepts, provide structured problem-solving frameworks, and build bulletproof accuracy in exam scenarios.\n\nClasses meet in our academy classrooms with weekly graded problem sets, detailed instructor feedback, and dedicated test-prep reviews.",
    curriculum: [
      {
        id: "a2h-w1",
        unit: "Week 1",
        topic: "Transformations of Parent Functions & Piecewise Graphs",
        objectives:
          "Vertical/horizontal shifts, reflections, dilations of absolute value, quadratic, and cubic functions; analyzing piecewise functions.",
        hours: "3 hrs",
      },
      {
        id: "a2h-w2",
        unit: "Week 2",
        topic: "Polynomial Functions, End Behavior & Graphing",
        objectives:
          "Multiplicity of roots, turning points, polynomial inequalities using sign charts, and graphing high-degree polynomials.",
        hours: "3 hrs",
      },
      {
        id: "a2h-w3",
        unit: "Week 3",
        topic: "Rational Expressions & Asymptote Analysis",
        objectives:
          "Adding/subtracting rational functions, vertical and horizontal asymptotes, holes/removable discontinuities, slant asymptotes.",
        hours: "3 hrs",
      },
      {
        id: "a2h-w4",
        unit: "Week 4",
        topic: "Exponential & Logarithmic Functions",
        objectives:
          "Logarithmic laws and proofs, natural logarithms, change of base formula, solving exponential growth and decay models.",
        hours: "3 hrs",
      },
      {
        id: "a2h-w5",
        unit: "Week 5",
        topic: "Conic Sections & Non-Linear Coordinate Systems",
        objectives:
          "Standard and general equations of circles, ellipses, hyperbolas, and parabolas; completing the square in two variables.",
        hours: "3 hrs",
      },
      {
        id: "a2h-w6",
        unit: "Week 6",
        topic: "Sequences, Series & Binomial Expansion",
        objectives:
          "Arithmetic and geometric series formulas, summation notation, infinite geometric series convergence, Binomial Theorem.",
        hours: "3 hrs",
      },
    ],
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
    detailedDescription:
      "Transitioning from concrete arithmetic to abstract symbolic algebra is one of the most critical turning points in a young mathematician's journey. This course ensures middle schoolers make that leap with confidence and excitement.\n\nStudents learn the language of variables, properties of equality, linear rate problems, and spatial reasoning in an encouraging, board-focused classroom setting.",
    curriculum: [
      {
        id: "t2a-w1",
        unit: "Week 1",
        topic: "From Arithmetic to Variables: The Language of Algebra",
        objectives:
          "Variables, expressions vs. equations, evaluating algebraic expressions, translating English word descriptions into algebraic equations.",
        hours: "2.5 hrs",
      },
      {
        id: "t2a-w2",
        unit: "Week 2",
        topic: "Solving One-Step & Two-Step Linear Equations",
        objectives:
          "Inverse operations, preserving equality balance, negative integer arithmetic rules, isolating variables with absolute confidence.",
        hours: "2.5 hrs",
      },
      {
        id: "t2a-w3",
        unit: "Week 3",
        topic: "Ratios, Proportions & Unit Rates",
        objectives:
          "Cross-multiplication reasoning, scaling ratios, unit conversions, speed-distance-time problems with visual tape diagrams.",
        hours: "2.5 hrs",
      },
      {
        id: "t2a-w4",
        unit: "Week 4",
        topic: "Linear Equations with Variables on Both Sides",
        objectives:
          "Distributive property expansion, collecting like terms, identifying equations with no solutions or infinite solutions.",
        hours: "2.5 hrs",
      },
      {
        id: "t2a-w5",
        unit: "Week 5",
        topic: "Linear Inequalities & Number Line Graphing",
        objectives:
          "Greater than/less than rules, multiplying or dividing by negatives, compound inequalities, word problem constraints.",
        hours: "2.5 hrs",
      },
      {
        id: "t2a-w6",
        unit: "Week 6",
        topic: "The Coordinate Plane, Slopes & Linear Graphs",
        objectives:
          "Plotting (x, y) coordinates, slope as rate of change (rise over run), graphing y = mx + b, capstone middle school problem contest.",
        hours: "2.5 hrs",
      },
    ],
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
    detailedDescription:
      "The AMC 8 and AMC 10 competitions reward ingenuity, speed, and deep theoretical mastery over rote school math. Led by seasoned Olympiad instructors, this cohort delivers rigorous preparation across the four foundational competition pillars: Number Theory, Combinatorics, Geometry, and Algebra.\n\nStudents analyze past AMC problems, learn time-management strategies, and participate in timed mock exam simulations with instant board debriefs.",
    curriculum: [
      {
        id: "amc-w1",
        unit: "Week 1",
        topic: "Number Theory: Modular Arithmetic & Divisibility",
        objectives:
          "Clock arithmetic, modular congruences, finding last digits, prime factor counting, Euler's totient introduction.",
        hours: "3 hrs",
      },
      {
        id: "amc-w2",
        unit: "Week 2",
        topic: "Combinatorics: Permutations, Combinations & Casework",
        objectives:
          "Fundamental counting principle, nPr and nCr formulas, complementary counting, Stars and Bars distribution technique.",
        hours: "3 hrs",
      },
      {
        id: "amc-w3",
        unit: "Week 3",
        topic: "Probability: Theoretical, Geometric & Expected Values",
        objectives:
          "Compound events, conditional probability, geometric area-based probability, dice and card combinatorial distributions.",
        hours: "3 hrs",
      },
      {
        id: "amc-w4",
        unit: "Week 4",
        topic: "Contest Geometry: Area Ratios, Similarity & Circle Theorems",
        objectives:
          "Mass points basics, triangle area ratios by shared bases/heights, Ptolemy's theorem, Power of a Point in AMC questions.",
        hours: "3 hrs",
      },
      {
        id: "amc-w5",
        unit: "Week 5",
        topic: "Contest Algebra: Vieta's, Telescoping Sums & Sequences",
        objectives:
          "Symmetric polynomials, telescoping fractions and roots, recurrence relations, AM-GM bounding tactics.",
        hours: "3 hrs",
      },
      {
        id: "amc-w6",
        unit: "Week 6",
        topic: "Timed Mock AMC Exam & Strategic Solutions Review",
        objectives:
          "Full 25-question timed simulated contest, scoring strategy (guessing vs. leaving blank), detailed item analysis and solution clinic.",
        hours: "3 hrs",
      },
    ],
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
    detailedDescription:
      "Pre-Calculus represents the grand synthesis of high school algebra and geometry, laying the groundwork for AP Calculus AB/BC and university-level mathematics. This cohort emphasizes analytic rigor, geometric intuition, and fluid trigonometric manipulation.\n\nStudents master unit circle trigonometry, vector spaces, polar coordinates, parametric trajectories, and formal limit concepts in an engaging classroom setting.",
    curriculum: [
      {
        id: "calc-w1",
        unit: "Week 1",
        topic: "Unit Circle Trigonometry & Analytic Identities",
        objectives:
          "Radian measure, trigonometric definitions on the unit circle, Pythagorean identities, sum/difference and double-angle formulas.",
        hours: "3 hrs",
      },
      {
        id: "calc-w2",
        unit: "Week 2",
        topic: "Graphing Sinusoidal Functions & Inverse Trig",
        objectives:
          "Amplitude, period, phase shifts, vertical translations; domain and range restrictions for arcsin, arccos, and arctan.",
        hours: "3 hrs",
      },
      {
        id: "calc-w3",
        unit: "Week 3",
        topic: "Laws of Sines & Cosines with Vector Physics",
        objectives:
          "Ambiguous SSA cases, Heron's formula, 2D vector addition/dot products, projection vectors, work and force resolution.",
        hours: "3 hrs",
      },
      {
        id: "calc-w4",
        unit: "Week 4",
        topic: "Polar Coordinates, Complex Plane & De Moivre's Theorem",
        objectives:
          "Converting between Cartesian and polar coordinates; graphing rose curves, limaçons; multiplying complex numbers in polar form.",
        hours: "3 hrs",
      },
      {
        id: "calc-w5",
        unit: "Week 5",
        topic: "Parametric Curves & Matrices in Geometry",
        objectives:
          "Eliminating the parameter, projectile motion modeling, matrix transformations (rotations, reflections, shears).",
        hours: "3 hrs",
      },
      {
        id: "calc-w6",
        unit: "Week 6",
        topic: "Foundations of Limits & Calculus Readiness Capstone",
        objectives:
          "Intuitive definition of limits, one-sided limits, limits at infinity, continuity criteria, introduction to difference quotients.",
        hours: "3 hrs",
      },
    ],
  },
];
