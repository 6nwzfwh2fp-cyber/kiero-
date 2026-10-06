export type Subscriber = { email: string; joinedAt: string };
const STORAGE_KEY = 'kiiero-crunch:early-access:v1';

/** Replace this adapter with the marketing provider's API when launch is ready. */
export async function joinEarlyAccess(email: string): Promise<'joined' | 'existing'> {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || normalized.length > 254) {
    throw new Error('That email needs a little fix. Try name@example.com.');
  }
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const subscribers: Subscriber[] = Array.isArray(stored)
      ? stored.filter((entry): entry is Subscriber => Boolean(entry && typeof entry.email === 'string' && typeof entry.joinedAt === 'string'))
      : [];
    if (subscribers.some((entry) => entry.email === normalized)) return 'existing';
    subscribers.push({ email: normalized, joinedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    return 'joined';
  } catch {
    throw new Error('Your browser couldn’t save your email. Please allow local storage and try again.');
  }
}
