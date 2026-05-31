import Cookies from "js-cookie";

export function getCurrentRole() {
  return Cookies.get("role");
}

export function canManageData(role?: string) {
  return role === "SUPER_ADMIN" || role === "ADMIN";
}

export function isSuperAdmin(role?: string) {
  return role === "SUPER_ADMIN";
}

export function isAdmin(role?: string) {
  return role === "ADMIN";
}

export function isUser(role?: string) {
  return role === "USER";
}
