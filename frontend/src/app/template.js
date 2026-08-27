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
    <div className="page-enter-animation">
      {children}
    </div>
  );
}