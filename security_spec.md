# Security Specification — Yao Kra Celestin Portfolio (Firestore Rules)

## 1. Data Invariants
1. **Default Deny**: All unmatched paths under `/databases/{database}/documents` are denied for both reads and writes.
2. **Verified Admin Writes Only**: Creating, updating, or deleting `/mediaAssets/{slotId}`, `/siteSettings/contact`, or `/sessions/{sessionId}` requires an authenticated user with `request.auth.token.email_verified == true` who is either the bootstrapped owner (`kracelestin31@gmail.com`) or listed in `/admins/{uid}`.
3. **Public Portfolio Reads Scoped Explicitly**: Public visitors may read or list `/mediaAssets`, `/siteSettings/contact`, and `/sessions` ONLY when `resource.data.isPublic == true`. No blanket `allow list: if true` without checking `resource.data`.
4. **No Self-Assigned Admin**: `/admins/{uid}` is strictly non-writable from client SDKs (`allow write: if false`) and readable only by `request.auth.uid == uid`.
5. **Strict Schema, Sizes & Path Hardening**: All document IDs match `^[a-zA-Z0-9_\-]+$` (<= 128 chars), every string enforces explicit `.size()` boundaries matching `firebase-blueprint.json`, `slotId`/`sessionId` match path IDs, `updatedBy == request.auth.uid`, and `createdAt`/`updatedAt` strictly match `request.time` with `createdAt` immutable on updates.

## 2. The "Dirty Dozen" Adversarial Payloads (Must All Return PERMISSION_DENIED)
1. **Unauthenticated Write**: Anonymous user attempts `setDoc('/mediaAssets/hero-portrait', validPayload)` -> DENIED.
2. **Non-Admin Authenticated Write**: Signed-in user `attacker@example.com` (verified) attempts `create` on `/mediaAssets/hero-portrait` -> DENIED.
3. **Email Spoofing (Unverified Email)**: Token has `email: "kracelestin31@gmail.com"` with `email_verified: false` -> DENIED.
4. **Privilege Escalation**: Authenticated user attempts `setDoc('/admins/' + uid, { role: 'admin' })` -> DENIED.
5. **Shadow / Ghost Field Injection**: Verified admin writes `/mediaAssets/hero-portrait` with extra `{ isFeatured: true }` -> DENIED by `keys().hasOnly(...)`.
6. **ID Poisoning**: Verified admin attempts write to `/mediaAssets/../../etc/passwd` or 200-char ID -> DENIED by `isValidId(slotId)`.
7. **Slot ID Mismatch**: Verified admin writes to `/mediaAssets/hero-portrait` with `{ slotId: "exp-lib", ... }` -> DENIED.
8. **Payload Size / DoW Attack**: Verified admin writes `dataUrl` exceeding `800000` bytes or `caption` > `300` chars -> DENIED.
9. **Invalid Image Protocol**: Verified admin writes `dataUrl: "javascript:alert(1)"` -> DENIED by `dataUrl.matches('^(https://|data:image/).*')`.
10. **Client-Spoofed Timestamp**: Verified admin writes `createdAt` or `updatedAt` != `request.time` -> DENIED.
11. **Immutable `createdAt` Tampering**: Verified admin updates `/mediaAssets/hero-portrait` changing `createdAt` -> DENIED.
12. **Identity Spoofing on `updatedBy`**: Verified admin writes `updatedBy: "other-uid"` != `request.auth.uid` -> DENIED.
