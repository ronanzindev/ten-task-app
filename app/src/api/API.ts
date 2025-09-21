export class API {
    private readonly baseUrl: string = process.env.NEXT_BACKEND_URL || "http://localhost:4000"

    private async request<T>(path: string, opts: RequestInit): Promise<T> {
        try {
            const res = await fetch(`${this.baseUrl}${path}`, opts)
            if (!res.ok) {
                const errorText = await res.text()
                throw new Error(`HTTP: ${res.status}: ${errorText}`)
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
}