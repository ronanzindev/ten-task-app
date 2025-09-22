import { Skeleton } from "./ui/skeleton";

export function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4 px-4">
            <Skeleton className="w-64 h-8 rounded-md" />
            <Skeleton className="w-96 h-6 rounded-md" />
            <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl mt-8">
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-32 w-full rounded-md md:col-span-2" />
            </div>
        </div>
    );
}