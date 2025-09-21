import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgressCardProps = {
  completed: number;
  total: number;
};

export function ProgressCard({ completed, total }: ProgressCardProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="md:col-span-1">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="text-foreground font-medium">
                {completed} of {total}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
