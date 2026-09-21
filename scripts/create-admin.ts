/**
 * Creates an admin user directly in the local database.
 *
 * Usage:
 *   npm run create-admin -- --email=you@example.com --password=... [--name="Jane Doe"] [--role=SUPER_ADMIN]
 *
 * Or set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME / ADMIN_ROLE environment variables instead
 * of flags. No credentials are hardcoded anywhere in this codebase — you supply them.
 */
import { createUser, findUserByEmail } from "../lib/models";
import { hashPassword } from "../lib/password";
import { ALL_ROLES, type Role } from "../lib/auth";

function arg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found ? found.slice(prefix.length) : undefined;
}

function main() {
  const email = (arg("email") || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = arg("password") || process.env.ADMIN_PASSWORD || "";
  const name = arg("name") || process.env.ADMIN_NAME || "Academy Administrator";
  const role = (arg("role") || process.env.ADMIN_ROLE || "SUPER_ADMIN") as Role;

  if (!email || !password) {
    console.error(
      'Usage: npm run create-admin -- --email=you@example.com --password=... [--name="..."] [--role=SUPER_ADMIN]\n' +
        "Or set ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME / ADMIN_ROLE environment variables."
    );
    process.exit(1);
  }

  if (!ALL_ROLES.includes(role)) {
    console.error(`Invalid role "${role}". Valid roles: ${ALL_ROLES.join(", ")}`);
    process.exit(1);
  }

  if (password.length < 10) {
    console.error("Password must be at least 10 characters.");
    process.exit(1);
  }

  if (findUserByEmail(email)) {
    console.error(`A user with email ${email} already exists.`);
    process.exit(1);
  }

  createUser({ email, passwordHash: hashPassword(password), name, role });
  console.log(`Created ${role} user: ${email}`);
}

main();
