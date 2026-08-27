import mongoose from "mongoose";

const getCollectionModel = (collectionName) => {
  const dynamicSchema = new mongoose.Schema(
    {},
    {
      strict: false,
      collection: collectionName,
    },
  );

  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, dynamicSchema)
  );
};

export const getLocations = async (req, res) => {
  try {
    const { type, division_id, district_id, local_body_id, zone_id } =
      req.query;

    let targetCollection;
    let query = {};

    // =====================================================
    // Division → District
    // =====================================================

    if (division_id) {
      targetCollection = "districts";

      query = {
        division_id: String(division_id).trim(),
      };
    }

    // =====================================================
    // District → Upazila / Local Body
    // =====================================================
    else if (district_id) {
      targetCollection = "upazilas";

      query = {
        district_id: String(district_id).trim(),
      };
    }

    // =====================================================
    // Local Body → Zone / Union / Municipality
    // =====================================================
    else if (local_body_id) {
      targetCollection = "zones";

      query = {
        local_body_id: String(local_body_id).trim(),
      };
    }

    // =====================================================
    // Zone / Union / Municipality → Area
    // =====================================================
    else if (zone_id) {
      targetCollection = "areas";

      query = {
        zone_id: String(zone_id).trim(),
      };
    }

    // =====================================================
    // No parameter → Divisions
    // =====================================================
    else {
      targetCollection = "divisions";
      query = {};
    }

    // =====================================================
    // Dynamic Model
    // =====================================================

    const Model = getCollectionModel(targetCollection);

    // =====================================================
    // Fetch
    // =====================================================

    const locations = await Model.find(query).lean();

    // =====================================================
    // DEBUG RESULT
    // =====================================================

    console.log(`Found ${locations.length} records in ${targetCollection}`);

    if (targetCollection === "areas") {
      console.log("AREA RESULT:", locations);
    }

    // =====================================================
    // Response
    // =====================================================

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.error("Location Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: "লোকেশন ডেটা ফেচ করতে সার্ভারে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};
