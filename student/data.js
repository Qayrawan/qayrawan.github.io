window.QAYRAWAN_STUDENT_DATA = {
  users: [
    { id: "u_student_01", username: "student01", password: "1111", role: "student", displayName: "محمد علي", name: { first: "محمد", father: "علي", grandfather: "حسن", family: "التميمي" }, grade: "7", classLetter: "A", photoUrl: "" },
    { id: "u_student_02", username: "student02", password: "2222", role: "student", displayName: "حسين كريم", name: { first: "حسين", father: "كريم", grandfather: "صالح", family: "الزبيدي" }, grade: "8", classLetter: "B", photoUrl: "" },
    { id: "u_student_03", username: "student03", password: "3333", role: "student", displayName: "علي أحمد", name: { first: "علي", father: "أحمد", grandfather: "جاسم", family: "الجبوري" }, grade: "9", classLetter: "A", photoUrl: "" },
    { id: "u_student_04", username: "student04", password: "4444", role: "student", displayName: "أحمد نور", name: { first: "أحمد", father: "نور", grandfather: "سعد", family: "الخالدي" }, grade: "10", classLetter: "C", photoUrl: "" },
    { id: "u_student_05", username: "student05", password: "5555", role: "student", displayName: "يوسف ميثم", name: { first: "يوسف", father: "ميثم", grandfather: "هاني", family: "العبيدي" }, grade: "11", classLetter: "A", photoUrl: "" }
  ],
  settings: { language: "ar", theme: "dark", compact: false, showFullName: false, showAvatars: true, notifications: true },
  announcements: [
    { id: "a1", title: "بدء العام الدراسي", body: "يرجى متابعة الواجبات والجدول اليومي من الصفحة الرئيسية. أي تحديث رسمي سيظهر هنا.", audience: "all", time: new Date().toISOString() },
    { id: "a2", title: "تنبيه تنظيمي", body: "هذا النظام مخصص للتجربة داخل القروب المدرسي فقط. لا أحد يخرب الدنيا برسائل مالها داعي.", audience: "all", time: new Date().toISOString() }
  ],
  homework: [
    { id: "h1", grade: "7", classLetter: "A", period: "1", subject: "رياضيات", teacher: "الأستاذ أحمد", title: "حل صفحة 12", dueDay: "monday", time: new Date().toISOString() },
    { id: "h2", grade: "7", classLetter: "A", period: "3", subject: "عربي", teacher: "الأستاذة سارة", title: "قراءة النص وكتابة خمس أسطر", dueDay: "monday", time: new Date().toISOString() },
    { id: "h3", grade: "10", classLetter: "C", period: "2", subject: "فيزياء", teacher: "الأستاذ علي", title: "حل أسئلة التجربة", dueDay: "tuesday", time: new Date().toISOString() }
  ],
  timetable: {
    "7": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } },
    "8": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } },
    "9": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } },
    "10": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } },
    "11": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } },
    "12": { sunday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, monday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, tuesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, wednesday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" }, thursday: { period1: "", period2: "", period3: "", period4: "", period5: "", period6: "" } }
  },
  discussions: { "7": [], "8": [], "9": [], "10": [], "11": [], "12": [] },
  questions: [],
  notifications: [],
  cooldowns: { "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0 }
};
