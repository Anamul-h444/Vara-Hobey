/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/admin/dashboard/rent-type/page.js
 * Description: Admin Rent Type Management page matched with the dark UI design and pagination.
 * ==============================================================================
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Toast from "@/app/components/ui/Toast";
import { fetchApi } from "@/utils/api";

export default function RentTypeManagementPage() {
  const [rentTypes, setRentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState({ bn: "", en: "" });
  const [showToast, setShowToast] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form States
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    bnName: "",
    category: "residential",
  });
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Rent Types
  const fetchRentTypes = async () => {
    try {
      setLoading(true);
      const result = await fetchApi("/rent-types");
      if (result.success) {
        setRentTypes(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch rent types:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentTypes();
  }, []);

  // Handle Form Submit (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editId ? `/rent-types/${editId}` : "/rent-types";
      const method = editId ? "PUT" : "POST";

      const result = await fetchApi(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      if (result.success) {
        setToastMessage({
          bn: editId
            ? "রেন্ট টাইপ সফলভাবে আপডেট করা হয়েছে!"
            : "নতুন রেন্ট টাইপ সফলভাবে যোগ করা হয়েছে!",
          en: editId
            ? "Rent type updated successfully!"
            : "Rent type created successfully!",
        });
        setShowToast(true);
        fetchRentTypes();
        handleCloseModal();
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // Handle Edit
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      type: item.type,
      name: item.name,
      bnName: item.bnName,
      category: item.category,
    });
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (confirm("আপনি কি নিশ্চিত এই রেন্ট টাইপটি ডিলিট করতে চান?")) {
      try {
        const result = await fetchApi(`/rent-types/${id}`, {
          method: "DELETE",
        });
        if (result.success) {
          setToastMessage({
            bn: "সফলভাবে ডিলিট করা হয়েছে!",
            en: "Deleted successfully!",
          });
          setShowToast(true);
          fetchRentTypes();
        } else {
          alert(result.message || "Something went wrong!");
        }
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  // Close Modal & Reset
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData({ type: "", name: "", bnName: "", category: "residential" });
  };

  // Pagination Logic
  const totalPages = Math.ceil(rentTypes.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rentTypes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        messageBn={toastMessage.bn}
        messageEn={toastMessage.en}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Rent Type Management
          </h1>
          <p className="font-bangla text-xs sm:text-sm text-slate-400 mt-1">
            ওয়েবসাইটের প্রপার্টি বা ভাড়ার ক্যাটাগরি এবং টাইপ এখান থেকে
            নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Type</span>
        </button>
      </div>

      {/* Premium Floating Card Table Container (Dark Theme Matched) */}
      <div className="bg-[#121824]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-400 uppercase tracking-wider text-xs font-bold px-4">
                <th className="pb-2 px-4">Type ID (Key)</th>
                <th className="pb-2 px-4">Name (English)</th>
                <th className="pb-2 px-4 font-bangla">বাংলা নাম</th>
                <th className="pb-2 px-4">Category</th>
                <th className="pb-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className="bg-[#161f30]/70 hover:bg-[#1a2438] transition-all shadow-md rounded-2xl group border border-white/5"
                  >
                    <td className="p-4 font-mono text-emerald-400 font-bold text-xs rounded-l-2xl">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 mr-2 text-[11px] border border-emerald-500/20">
                        {indexOfFirstItem + index + 1 < 10
                          ? `0${indexOfFirstItem + index + 1}`
                          : indexOfFirstItem + index + 1}
                      </span>
                      {item.type}
                    </td>
                    <td className="p-4 text-slate-100 font-semibold text-sm">
                      {item.name}
                    </td>
                    <td className="p-4 font-bangla text-slate-100 font-semibold text-sm">
                      {item.bnName}
                    </td>
                    <td className="p-4 capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.category === "residential"
                            ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                            : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 rounded-r-2xl">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer inline-flex items-center"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer inline-flex items-center"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center text-slate-400 text-sm font-medium"
                  >
                    {loading
                      ? "ডেটা লোড হচ্ছে..."
                      : "কোনো রেন্ট টাইপ পাওয়া যায়নি।"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {rentTypes.length > itemsPerPage && (
          <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10 px-2">
            <p className="text-xs text-slate-400 font-medium">
              Showing{" "}
              <span className="font-bold text-slate-200">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-200">
                {Math.min(indexOfLastItem, rentTypes.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-200">
                {rentTypes.length}
              </span>{" "}
              results
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 scale-105"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {page < 10 ? `0${page}` : page}
                  </button>
                ),
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0c1019] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-base font-bold text-slate-100">
                {editId ? "Edit Rent Type" : "Add New Rent Type"}
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Type Key (যেমন: flat, sublet)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. flat"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Name (English)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat / Apartment"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  বাংলা নাম (Bengali Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ফ্ল্যাট / অ্যাপার্টমেন্ট"
                  value={formData.bnName}
                  onChange={(e) =>
                    setFormData({ ...formData, bnName: e.target.value })
                  }
                  className="w-full bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 font-bangla placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Category (ক্যাটাগরি)
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-[#141923] border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="transport">Transport</option>
                  <option value="land">Land</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  {editId ? "Update Changes" : "Save Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
