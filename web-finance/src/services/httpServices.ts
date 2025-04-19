import { apiUrl } from "@config/paths";

export const Get = async <T>(endpoint: string) => {
  const response = await fetch(`${apiUrl}${endpoint}`);
  if (!response.ok) throw new Error('HTTP error');
  return response.json() as Promise<T>;
};

export const Post = async <T>(endpoint: string, body: any) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('HTTP error');
  return response.json() as Promise<T>;
};

export const Put = async <T>(endpoint: string, body: any) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('HTTP error');
  return response.json() as Promise<T>;
};

export const Del = async <T>(endpoint: string) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('HTTP error');
  return response.json() as Promise<T>;
};
