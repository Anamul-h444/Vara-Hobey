import slugify from "slugify";

export const flatSlugify = (title) => {
  if (!title) return "";

  // যদি টাইটেলটি সম্পূর্ণ বাংলায় হয়, তবে slugify অনেক সময় ফাঁকা স্ট্রিং রিটার্ন করতে পারে।
  // তাই বাংলা ও ইংরেজি উভয় ভাষার জন্য এটি একদম নিরাপদ ও নিখুঁত পদ্ধতি:
  const cleanSlug = slugify(title, {
    replacement: "-", // স্পেসের জায়গায় ড্যাশ বসবে
    lower: true, // সব লেটার ছোট হাতের হবে
    strict: false, // false রাখলে বাংলা অক্ষর বা ইউনিকোড ডিলিট হয়ে যাবে না
    trim: true, // সামনে বা পিছনের অতিরিক্ত স্পেস কেটে দেবে
  });

  return `${cleanSlug}-${Date.now().toString().slice(-6)}`;
};
