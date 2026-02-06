export type Gender = "male" | "female";

export type LoginPayload = {
  nickname: string;
  gender: Gender;
  bio: string;
  instagram?: string;
  acceptedRules: boolean;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    nickname: string;
  };
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "";

/**
 * Real login call.
 * Expected backend: POST {API_BASE}/auth/login
 * If backend is not ready, we fallback to a mock token.
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  // Basic safety: frontend should never submit without rules accepted
  if (!payload.acceptedRules) {
    throw new Error("Qaydalar qəbul edilmədən davam etmək olmaz.");
  }

  // If no API base provided, mock.
  if (!API_BASE) return mockLogin(payload);

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Try to read backend error
      const text = await res.text().catch(() => "");
      throw new Error(text || `Login failed (HTTP ${res.status})`);
    }

    const data = (await res.json()) as LoginResponse;

    if (!data?.token) {
      throw new Error("Backend token qaytarmadı.");
    }

    return data;
  } catch (e: any) {
    // If backend is down locally, don't block dev: mock it
    // Comment out next line if you want strict real-backend only.
    return mockLogin(payload);

    // For strict mode, use:
    // throw new Error(e?.message || "Serverə qoşulmaq alınmadı.");
  }
}

function mockLogin(payload: LoginPayload): LoginResponse {
  const fakeId = cryptoRandomId();
  return {
    token: `mock-token-${fakeId}`,
    user: { id: fakeId, nickname: payload.nickname.trim() },
  };
}

function cryptoRandomId(): string {
  // Works in modern browsers; fallback if needed
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

/** Simple token storage (MVP). */
const TOKEN_KEY = "bda_token";
const USER_KEY = "bda_user";

export function saveSession(token: string, user: LoginResponse["user"]) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
