/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/template.js
 * Description: Global smooth page transition wrapper executing on route changes.
 * ==============================================================================
 */

'use client';

export default function Template({ children }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out fill-mode-both">
      {children}
    </div>
  );
}