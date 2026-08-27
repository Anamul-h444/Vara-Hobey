import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, required: true },
  name_bn: { type: String, required: true },
  name_en: { type: String, required: true },
  
  division_id: { type: String, default: null },
  district_id: { type: String, default: null },
  local_body_id: { type: String, default: null },
  zone_id: { type: String, default: null },
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);

export default Location; // <--- এখানে default export নিশ্চিত করা হলো