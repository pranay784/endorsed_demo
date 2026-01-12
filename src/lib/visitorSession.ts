const VISITOR_ID_KEY = 'nova_visitor_id';

function generateVisitorId(): string {
  return `visitor_${crypto.randomUUID()}`;
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') {
    return generateVisitorId();
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  return visitorId;
}

export function resetVisitorSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(VISITOR_ID_KEY);
  }
}
