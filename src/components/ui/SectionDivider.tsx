export function SectionDivider() {
  return (
    <div className="my-2 flex w-full items-center gap-6 px-6 md:px-16 lg:px-24">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-charcoal-600/50" />
      <div className="h-1.5 w-1.5 rounded-full bg-luxury-gold/40" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-charcoal-600/50" />
    </div>
  );
}
