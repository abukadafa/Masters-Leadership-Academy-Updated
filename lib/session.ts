import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE, type SessionUser } from "./auth";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
