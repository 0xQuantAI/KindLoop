import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { cn } from "../lib/utils"

export default function FormPage({ title, description, children, className }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-4 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="h-2 w-full bg-primary" />
        <Card className={cn("border-0 shadow-none", className)}>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </CardHeader>
          <CardContent className="space-y-6">{children}</CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        This app is intentionally simple — big buttons, fewer clicks.
      </p>
    </div>
  )
}

