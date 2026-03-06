import { Separator } from "./ui/separator"

export default function FormSection({ title, hint, children }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      <Separator />
      <div className="space-y-4">{children}</div>
    </section>
  )
}

