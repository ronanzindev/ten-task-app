import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Error() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md border-red-400">
                <CardHeader>
                    <CardTitle className="text-red-600">Oops!</CardTitle>
                    <CardDescription>Something went wrong while fetching tasks.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button onClick={() => window.location.reload()}>Retry</Button>
                </CardContent>
            </Card>
        </div>
    );
}