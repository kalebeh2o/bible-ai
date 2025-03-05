const API_BASE_URL = 'https://www.abibliadigital.com.br/api/';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZWQgTWFyIDA1IDIwMjUgMTU6NTg6NDYgR01UKzAwMDAua2FsZWJlZjMxQGVtYWlsLmNvbSIsImlhdCI6MTc0MTE5MDMyNn0.JXdTjdkhDxnq4w8wUYV5RyI3sT-e8dpIed4_9kEDUXQ';

interface RequestOptions extends RequestInit {
  needAuth?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.needAuth !== false && { Authorization: `Bearer ${BEARER_TOKEN}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Erro da API (${response.status}):`, errorData);
      throw new Error(errorData.message || 'Erro ao consultar a API');
    }

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export const getData = <T>(endpoint: string, options?: RequestOptions) =>
  request<T>(endpoint, { ...options, method: 'GET' });

export const postData = <T>(endpoint: string, data: any, options?: RequestOptions) =>
  request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) });

export const putData = <T>(endpoint: string, data: any, options?: RequestOptions) =>
  request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(data) });

export const deleteData = <T>(endpoint: string, options?: RequestOptions) =>
  request<T>(endpoint, { ...options, method: 'DELETE' });
