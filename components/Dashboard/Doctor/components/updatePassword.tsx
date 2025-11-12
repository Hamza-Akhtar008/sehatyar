"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BORDER_COLOR = "#6fe495";
const PRIMARY_COLOR = "#6fe495";
const BG_COLOR = "#f8fffb";

const UpdatePassword: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  // Add visibility toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (currentPassword && currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    let userId: string | null = null;
    let token: string | null = null;
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        userId = parsed.id ? String(parsed.id) : null;
        token = parsed.token || localStorage.getItem("authToken");
      }
    } catch {
      userId = null;
    }

    if (!userId) {
      toast.error("User not found. Please login again.");
      return;
    }

    setSaving(true);
    try {
      // Verify current password first
      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!verifyRes.ok) {
        const err = await verifyRes.json().catch(() => ({}));
        throw new Error(err?.message || "Unable to verify current password");
      }
      const userData = await verifyRes.json();
      if (!userData?.password || userData.password !== currentPassword) {
        toast.error("Current password is incorrect");
        return;
      }

      // Proceed to update password
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to update password");
      }

      toast.success("Password updated successfully");
      setOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* Beautiful Password Section Header */}
      <div className="mb-8 pb-8 border-b" style={{ borderColor: BORDER_COLOR }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Password & Security</h2>
              <p className="text-gray-600 text-sm">Manage your account password and security settings</p>
            </div>
          </div>
          
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
            style={{ 
              backgroundColor: PRIMARY_COLOR,
              background: "linear-gradient(135deg, #6fe495 0%, #4cdc84 100%)"
            }}
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Update Password
          </button>
        </div>
      </div>

      {/* Beautiful Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => !saving && setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in-90 zoom-in-90"
            style={{ 
              border: `1px solid ${BORDER_COLOR}`,
              background: "linear-gradient(135deg, #ffffff 0%, #f8fffb 100%)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">Update Password</h3>
                <p className="text-gray-600 text-sm">Secure your account with a new password</p>
              </div>
              <button
                onClick={() => !saving && setOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? (
                      // Eye off
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.055 10.055 0 012.563-4.263M6.223 6.223A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.055 10.055 0 01-3.25 4.5M15 12a3 3 0 10-6 0 3 3 0 006 0zM3 3l18 18" />
                      </svg>
                    ) : (
                      // Eye
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Create a strong new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? (
                      // Eye off
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.055 10.055 0 012.563-4.263M6.223 6.223A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.055 10.055 0 01-3.25 4.5M15 12a3 3 0 10-6 0 3 3 0 006 0zM3 3l18 18" />
                      </svg>
                    ) : (
                      // Eye
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 bg-white border border-gray-300 text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      // Eye off
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.055 10.055 0 012.563-4.263M6.223 6.223A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.055 10.055 0 01-3.25 4.5M15 12a3 3 0 10-6 0 3 3 0 006 0zM3 3l18 18" />
                      </svg>
                    ) : (
                      // Eye
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => !saving && setOpen(false)}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors border border-gray-300"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-3 disabled:opacity-70 hover:shadow-lg transition-all duration-300"
                  style={{ 
                    background: "linear-gradient(135deg, #6fe495 0%, #4cdc84 100%)"
                  }}
                >
                  {saving ? (
                    <>
                      <span className="inline-block w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Security Tips */}
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Security Tips</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Use a strong password with letters, numbers, and special characters for better security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;