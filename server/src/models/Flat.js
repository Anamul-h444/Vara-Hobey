import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // ইউজারের আইডি (কে পোস্ট করেছে তা ট্র্যাক করার জন্য)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ইউজার আইডি আবশ্যক"],
    },

    // বিজ্ঞাপনের বর্তমান অবস্থা (Active, Expired, Draft, Paused/Rented)
    status: {
      type: String,
      enum: ["active", "expired", "draft", "paused"],
      default: "draft",
    },

    // ১. বেসিক ইনফরমেশন
    fareType: {
      type: String,
      required: [true, "প্রপার্টি টাইপ আবশ্যক"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "বিজ্ঞাপনের শিরোনাম আবশ্যক"],
      trim: true,
      maxlength: [120, "শিরোনাম ১২০ অক্ষরের বেশি হতে পারবে না"],
    },
    details: {
      type: String,
      trim: true,
    },

    // ২. লোকেশন অবজেক্ট (ডাইনামিকালি সিলেক্ট করা সব ডাটা এবং আইডি সহ)
    location: {
      division: {
        id: { type: String, required: true },
        name_bn: { type: String, required: true },
        name_en: { type: String },
      },
      district: {
        id: { type: String, required: true },
        name_bn: { type: String, required: true },
        name_en: { type: String },
      },
      upazila: {
        id: { type: String, required: true },
        name_bn: { type: String, required: true },
        name_en: { type: String },
      },
      unionZone: {
        id: { type: String },
        name_bn: { type: String },
        name_en: { type: String },
      },
      area: {
        id: { type: String, required: true },
        name_bn: { type: String, required: true },
        name_en: { type: String },
      },
      roadAndHouse: {
        type: String,
        trim: true,
      },
    },

    // ৩. রেন্ট ও ফাইন্যান্সিয়াল ডিটেইলস
    pricing: {
      monthlyRent: {
        type: Number,
        required: [true, "মাসিক ভাড়া আবশ্যক"],
        min: [0, "ভাড়া ঋণাত্মক হতে পারে না"],
      },
      serviceCharge: {
        type: Number,
        default: 0,
      },
      advanceAmount: {
        type: Number,
        default: 0,
      },
    },

    // ৪. ইউটিলিটি বিল পলিসি
    utilityPolicy: {
      gas: {
        type: String,
        enum: ["included", "excluded"],
        default: "excluded",
      },
      electricity: {
        type: String,
        enum: ["included", "excluded"],
        default: "excluded",
      },
      water: {
        type: String,
        enum: ["included", "excluded"],
        default: "excluded",
      },
    },

    // ৫. প্রপার্টি স্পেসিফিকেশন ও রুম কনফিগারেশন
    specifications: {
      bedrooms: { type: Number, required: true, min: 1 },
      bathrooms: { type: Number, required: true, min: 1 },
      balconies: { type: Number, default: 0 },
      kitchens: { type: Number, default: 1 },
      drawingDining: { type: Boolean, default: false },
    },

    // ৬. সুযোগ-সুবিধা ও এমিনিটিজ
    amenities: {
      lift: { type: Boolean, default: false },
      generator: { type: Boolean, default: false },
      securityGuard: { type: Boolean, default: false },
      cctv: { type: Boolean, default: false },
      carParking: { type: Boolean, default: false },
      gasSupply: {
        type: String,
        enum: ["line", "cylinder"],
        required: [true, "গ্যাস সরবরাহের মাধ্যম সিলেক্ট করুন"],
      },
    },

    // ৭. যোগাযোগ এবং ছবি (Max 4 photos)
    contactInfo: {
      name: { type: String, required: [true, "যোগাযোগকারীর নাম আবশ্যক"] },
      mobileNumber: { type: String, required: [true, "মোবাইল নম্বর আবশ্যক"] },
      whatsappNo: { type: String },
    },

    photos: {
      type: [String],
      validate: [
        {
          validator: function (v) {
            // ড্রাফট বা তৈরির সময় ছবি নাও থাকতে পারে, কিন্তু পাবলিশের সময় চেক করা হবে
            if (this.status === "draft") return true;
            return v && v.length > 0 && v.length <= 4;
          },
          message: "কমপক্ষে ১টি এবং সর্বোচ্চ ৪টি ছবি আপলোড করা যাবে",
        },
      ],
    },

    // ৮. এসইও স্লাগ (গুগল এসইও ফ্রেন্ডলি URL এর জন্য)
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    // ৯. বিজ্ঞাপনের মেয়াদ (১ মাস বা ৩০ দিন)
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt
  },
);

// সার্চ এবং ফিল্টারিং অপ্টিমাইজেশনের জন্য ইনডেক্সিং
propertySchema.index({
  "location.area.id": 1,
  "pricing.monthlyRent": 1,
  status: 1,
});

const Flat = mongoose.models.Property || mongoose.model("Flat", propertySchema);

export default Flat;
