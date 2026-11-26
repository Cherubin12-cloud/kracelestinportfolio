/**
 * Adversarial Security Rules Test Matrix (Dirty Dozen)
 * Verifies that all 12 unauthorized or malformed payloads are denied by firestore.rules.
 * Intended to run against the Firebase Emulator Suite when available.
 */
export const dirtyDozenSecurityCases = [
  {
    name: '01. Unauthenticated write to /mediaAssets/hero-portrait',
    auth: null,
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '02. Non-admin verified user write to /mediaAssets/hero-portrait',
    auth: { uid: 'user-2', email: 'attacker@example.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '03. Email spoofing with email_verified: false',
    auth: { uid: 'spoof', email: 'kracelestin31@gmail.com', email_verified: false },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '04. Privilege escalation attempt on /admins/{uid}',
    auth: { uid: 'user-2', email: 'attacker@example.com', email_verified: true },
    path: '/admins/user-2',
    operation: 'create',
    payload: { role: 'admin' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '05. Shadow ghost field injection on /mediaAssets/hero-portrait',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { slotId: 'hero-portrait', isFeatured: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '06. Path ID poisoning with illegal characters',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/invalid$id',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '07. Slot ID body/path mismatch',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { slotId: 'exp-lib' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '08. Oversized caption exceeding 300 characters',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { caption: 'a'.repeat(301) },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '09. Unsafe javascript: URL in dataUrl',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { dataUrl: 'javascript:alert(1)' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '10. Client-forged timestamp (not serverTimestamp)',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '11. Immutable createdAt modification on update',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '12. Identity spoofing in updatedBy field',
    auth: { uid: 'admin-1', email: 'kracelestin31@gmail.com', email_verified: true },
    path: '/mediaAssets/hero-portrait',
    operation: 'create',
    payload: { updatedBy: 'other-uid' },
    expected: 'PERMISSION_DENIED',
  },
] as const;
