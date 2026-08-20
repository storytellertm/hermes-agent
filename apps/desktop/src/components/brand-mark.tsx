import { cn } from '@/lib/utils'

// Structure's two-column mark. Keeping it in markup lets every branded surface
// inherit the active Structure palette without another bundled image asset.
export function BrandMark({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-label="Structure"
      className={cn(
        'inline-flex size-14 shrink-0 items-end justify-center gap-1.5 overflow-hidden rounded-md border border-primary/25 bg-card px-3 py-2 shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_16%,transparent)]',
        className
      )}
      role="img"
      {...props}
    >
      <span aria-hidden="true" className="h-5 w-1.5 rounded-[1px] bg-foreground/90" />
      <span
        aria-hidden="true"
        className="h-8 w-2 rounded-[1px] bg-gradient-to-b from-primary to-[#167cca] shadow-[0_0_14px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
      />
    </span>
  )
}
