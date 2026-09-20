import type { Mode } from "@/lib/portfolio/technical"
import { PortfolioScaffold } from "@/components/portfolio/portfolio-scaffold"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[] }>
}) {
  const { mode: rawMode } = await searchParams
  const initialMode: Mode =
    typeof rawMode === "string" && rawMode === "business" ? "business" : "technical"

  return <PortfolioScaffold initialMode={initialMode} />
}