const logos: { src: string; alt: string }[] = [
  { src: "/logos/utd.svg", alt: "University of Texas at Dallas" },
  { src: "/logos/motorola-solutions.svg", alt: "Motorola Solutions" },
  { src: "/logos/university-of-salamanca.svg", alt: "Universidad de Salamanca" },
  { src: "/logos/harvard.svg", alt: "Harvard University" },
  { src: "/logos/iiba.svg", alt: "International Institute of Business Analysis" },
  { src: "/logos/pmi.svg", alt: "Project Management Institute" },
]

export function BrandStrip() {
  return (
    <section className="mt-12 border-t border-border pt-6">
      <p className="text-sm text-muted-foreground">Engaged with</p>
      <div className="marquee mt-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-16">
          {[...logos, ...logos].map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${logo.src}-${i}`}
              src={logo.src}
              alt={i < logos.length ? logo.alt : ""}
              loading="lazy"
              aria-hidden={i >= logos.length}
              className="h-7 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  )
}