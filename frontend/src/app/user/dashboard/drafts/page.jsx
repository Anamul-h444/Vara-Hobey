/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/user/dashboard/drafts/page.jsx
 *
 * Description:
 * User Draft Listings
 *
 * Features:
 * - Show current user's drafts
 * - Edit draft
 * - Delete draft
 * - Dynamic empty state
 * - Create new listing
 * ==============================================================================
 */

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FileEdit, Trash2, Plus, Building2, Clock } from "lucide-react";

export default function MyDraftsPage() {
  const router = useRouter();

  const [drafts, setDrafts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ============================================================================
  // GET CURRENT USER ID
  // ============================================================================

  const getCurrentUserId = () => {
    try {
      const userStr =
        localStorage.getItem("vara_hobe_user") || localStorage.getItem("user");

      if (!userStr) {
        return null;
      }

      const userObj = JSON.parse(userStr);

      return userObj?._id
        ? String(userObj._id)
        : userObj?.id
          ? String(userObj.id)
          : null;
    } catch (error) {
      return null;
    }
  };

  // ============================================================================
  // LOAD USER DRAFTS
  // ============================================================================

  const loadDrafts = () => {
    try {
      const storedDrafts = JSON.parse(
        localStorage.getItem("vara_hobe_drafts") || "[]",
      );

      if (!Array.isArray(storedDrafts)) {
        setDrafts([]);
        return;
      }

      const currentUserId = getCurrentUserId();

      if (!currentUserId) {
        setDrafts([]);
        return;
      }

      const userDrafts = storedDrafts.filter(
        (draft) => String(draft.userId) === String(currentUserId),
      );

      // Newest first
      userDrafts.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));

      setDrafts(userDrafts);
    } catch (error) {
      console.error("Failed to load drafts:", error);

      setDrafts([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // INITIAL LOAD
  // ============================================================================

  useEffect(() => {
    loadDrafts();
  }, []);

  // ============================================================================
  // EDIT DRAFT
  // ============================================================================

  const handleEdit = (draftId) => {
    router.push(
      `/user/dashboard/add-property?draftId=${encodeURIComponent(draftId)}`,
    );
  };

  // ============================================================================
  // DELETE DRAFT
  // ============================================================================

  const handleDelete = (draftId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this draft?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const storedDrafts = JSON.parse(
        localStorage.getItem("vara_hobe_drafts") || "[]",
      );

      if (!Array.isArray(storedDrafts)) {
        return;
      }

      const currentUserId = getCurrentUserId();

      const updatedDrafts = storedDrafts.filter(
        (draft) =>
          !(
            String(draft.id) === String(draftId) &&
            String(draft.userId) === String(currentUserId)
          ),
      );

      localStorage.setItem("vara_hobe_drafts", JSON.stringify(updatedDrafts));

      setDrafts((prev) =>
        prev.filter((draft) => String(draft.id) !== String(draftId)),
      );
    } catch (error) {
      console.error("Failed to delete draft:", error);
    }
  };

  // ============================================================================
  // LOADING
  // ============================================================================

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center text-slate-400">
        Loading drafts...
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div
      className="
        w-full
        min-h-full
        p-6
        lg:p-8
        text-slate-100
      "
    >
      {/* ========================================================================
          HEADER
      ======================================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-2xl
              sm:text-3xl
              font-black
              tracking-tight
            "
          >
            My Drafts
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            আপনার অসম্পূর্ণ বিজ্ঞাপনগুলো এখানে সংরক্ষিত আছে
          </p>
        </div>

        {/* NEW LISTING */}

        <button
          type="button"
          onClick={() => router.push("/user/dashboard/add-property")}
          className="
            px-4
            py-2.5
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-400
            text-slate-950
            font-bold
            text-sm
            flex
            items-center
            gap-2
            transition-all
            active:scale-95
          "
        >
          <Plus className="w-4 h-4" />
          New Listing
        </button>
      </div>

      {/* ========================================================================
          EMPTY STATE
      ======================================================================= */}

      {drafts.length === 0 && (
        <div
          className="
            min-h-[350px]
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/60
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-6
          "
        >
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-slate-800
              flex
              items-center
              justify-center
              mb-5
            "
          >
            <FileEdit className="w-7 h-7 text-slate-500" />
          </div>

          <h2 className="text-lg font-bold text-slate-200">No Drafts Yet</h2>

          <p
            className="
              text-sm
              text-slate-500
              mt-2
              max-w-md
            "
          >
            আপনার অসম্পূর্ণ বিজ্ঞাপনগুলো Save Draft করলে এখানে প্রদর্শিত হবে।
          </p>

          <button
            type="button"
            onClick={() => router.push("/user/dashboard/add-property")}
            className="
              mt-5
              px-5
              py-2.5
              rounded-xl
              bg-emerald-500
              hover:bg-emerald-400
              text-slate-950
              text-sm
              font-bold
              flex
              items-center
              gap-2
              transition-all
            "
          >
            <Plus className="w-4 h-4" />
            Create Draft
          </button>
        </div>
      )}

      {/* ========================================================================
          DRAFT LIST
      ======================================================================= */}

      {drafts.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-4
          "
        >
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/80
                p-5
                transition-all
                hover:border-slate-700
                hover:bg-slate-900
              "
            >
              {/* ================================================================
                  DRAFT HEADER
              ================================================================ */}

              <div className="flex items-start gap-4">
                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    className="
                      font-bold
                      text-slate-100
                      truncate
                    "
                  >
                    {draft.title || "Untitled Property"}
                  </h2>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      mt-1
                      flex
                      items-center
                      gap-1
                    "
                  >
                    <Clock className="w-3.5 h-3.5" />

                    {draft.savedAt || "Recently saved"}
                  </p>
                </div>
              </div>

              {/* ================================================================
                  DESCRIPTION
              ================================================================ */}

              {draft.details && (
                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-4
                    line-clamp-2
                    leading-relaxed
                  "
                >
                  {draft.details}
                </p>
              )}

              {/* ================================================================
                  ACTIONS
              ================================================================ */}

              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-2
                  mt-5
                  pt-4
                  border-t
                  border-slate-800
                "
              >
                {/* EDIT */}

                <button
                  type="button"
                  onClick={() => handleEdit(draft.id)}
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-emerald-500/10
                    hover:bg-emerald-500/20
                    border
                    border-emerald-500/20
                    text-emerald-400
                    text-xs
                    font-bold
                    flex
                    items-center
                    gap-2
                    transition-all
                  "
                >
                  <FileEdit className="w-4 h-4" />
                  Edit
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() => handleDelete(draft.id)}
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-red-500/10
                    hover:bg-red-500/20
                    border
                    border-red-500/20
                    text-red-400
                    text-xs
                    font-bold
                    flex
                    items-center
                    gap-2
                    transition-all
                  "
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
