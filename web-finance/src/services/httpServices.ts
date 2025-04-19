import { apiUrl } from "@config/paths";

export const Get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`);
    if (!response.ok) throw new Error('HTTP error');
    return await response.json();
  } catch (error) {
    console.error('Error in Get:', error);
    throw error;
  }
};

export const Post = async <T>(endpoint: string, body: any): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error('HTTP error');
    return await response.json();
  } catch (error) {
    console.error('Error in Post:', error);
    throw error;
  }
};

export const Put = async <T>(endpoint: string, body: any): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error('HTTP error');
    return await response.json();
  } catch (error) {
    console.error('Error in Put:', error);
    throw error;
  }
};

export const Del = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('HTTP error');
    return await response.json();
  } catch (error) {
    console.error('Error in Del:', error);
    throw error;
  }
};
