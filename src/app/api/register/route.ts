import { NextResponse } from "next/server";
import { getCourses, createRegistration, Course } from "@/lib/courses-db";

function validateStudent(student: any): boolean {
  return Boolean(student?.firstname && student?.lastname);
}

function validateParent(parent: any): boolean {
  return Boolean(parent?.firstname && parent?.lastname && parent?.email);
}

function validateCourseIds(courseIds: any): boolean {
  return Array.isArray(courseIds) && courseIds.length > 0;
}

function getValidationError(body: any): string | null {
  if (!validateStudent(body?.student)) {
    return "Student First Name and Last Name are required.";
  }
  if (!validateParent(body?.parent)) {
    return "Parent First Name, Last Name, and Email are required.";
  }
  if (!validateCourseIds(body?.courseIds)) {
    return "Please select at least one course to enroll in.";
  }
  return null;
}

function resolveSelectedCourses(courseIds: string[], allCourses: Course[]) {
  const selectedCourses: { id: string; title: string; price: number }[] = [];
  let totalPrice = 0;

  for (const id of courseIds) {
    const found = allCourses.find((c) => c.id === id);
    if (found) {
      selectedCourses.push({ id: found.id, title: found.title, price: found.price });
      totalPrice += found.price;
    }
  }

  return { selectedCourses, totalPrice };
}

function buildStudentData(student: any) {
  return {
    firstname: String(student.firstname).trim(),
    lastname: String(student.lastname).trim(),
    gender: student.gender || "unspecified",
    email: String(student.email || "")
      .trim()
      .toLowerCase(),
    phone: String(student.phone || "").trim(),
    school: String(student.school || "").trim(),
    gpa: String(student.gpa || "").trim(),
    grade: String(student.grade || "").trim(),
  };
}

function buildParentData(parent: any) {
  return {
    firstname: String(parent.firstname).trim(),
    lastname: String(parent.lastname).trim(),
    email: String(parent.email).trim().toLowerCase(),
    phone: String(parent.phone || "").trim(),
  };
}

function buildAddressData(address: any) {
  if (!address?.street && !address?.city) {
    return undefined;
  }
  return {
    street: String(address?.street || "").trim(),
    city: String(address?.city || "").trim(),
    state: String(address?.state || "").trim(),
    zip: String(address?.zip || "").trim(),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationError = getValidationError(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { student, parent, address, courseIds, paymentMethod } = body;
    const allCourses = await getCourses();
    const { selectedCourses, totalPrice } = resolveSelectedCourses(courseIds, allCourses);

    if (selectedCourses.length === 0) {
      return NextResponse.json({ error: "Selected courses could not be found." }, { status: 400 });
    }

    const addressData = buildAddressData(address);
    const saved = await createRegistration({
      student: buildStudentData(student),
      parent: buildParentData(parent),
      ...(addressData ? { address: addressData } : {}),
      courseIds,
      courses: selectedCourses,
      totalPrice,
      paymentMethod: paymentMethod || "Manual Payment (Zelle, Venmo, Wire, Check/Cash)",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration completed successfully",
        registrationId: saved.id,
        registration: saved,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting registration:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}
