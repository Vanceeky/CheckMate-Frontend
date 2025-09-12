// services/auth.ts
export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

// login -> backend will set cookies (access + refresh)
export async function login(data: LoginPayload): Promise<void> {
  const res = await fetch("http://localhost:8000/auth/jwt/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // needed for cookies
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
}

// get current user
export async function getCurrentUser(): Promise<User> {
  const res = await fetch("http://localhost:8000/auth/users/me/", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  await fetch("http://localhost:8000/auth/logout/", {
    method: "POST",
    credentials: "include",
  });
}

export async function refresh(): Promise<void> {
  await fetch("http://localhost:8000/auth/jwt/refresh/", {
    method: "POST",
    credentials: "include",
  });
}