import { HttpError } from "@/exceptions/http"

export class API {
    private readonly baseUrl: string = process.env.NEXT_BACKEND_URL || "http://localhost:4000"

    private async request<T>(path: string, opts: RequestInit): Promise<T> {
        try {
            const res = await fetch(`${this.baseUrl}${path}`, opts)
            if (!res.ok) {
                const error =  new HttpError("Error fetching data", await res.json(), res.status)
                throw error
            }
            if(res.status === 204) {
                return undefined as unknown as T
            }
            return res.json() as Promise<T>
        } catch (err) {
            console.error("API Error:", err);
            throw err
        }
    }
    async post<T>(path: string, body: unknown): Promise<T> {
        return this.request<T>(path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
    }

    async get<T>(path: string) {
        return this.request<T>(path, {})
    }

    async patch<T>(path: string) {
        return this.request<T>(path, {method: "PATCH"})
    }
    async delete(path: string) {
        return this.request<{}>(path, {method: "DELETE"})
    }
}