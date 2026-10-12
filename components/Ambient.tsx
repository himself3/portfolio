type Blob = {
  className: string
  color: 1 | 2 | 3
}

const presets: Record<'hero' | 'projects' | 'footer', Blob[]> = {
  hero: [
    { className: '-top-24 -left-24 w-[28rem] h-[28rem]', color: 1 },
    { className: 'top-1/4 right-[-8rem] w-[32rem] h-[32rem]', color: 2 },
    { className: 'bottom-[-10rem] left-1/3 w-[26rem] h-[26rem]', color: 3 },
  ],
  projects: [
    { className: 'top-10 -right-24 w-[30rem] h-[30rem]', color: 1 },
    { className: 'top-1/2 -left-32 w-[28rem] h-[28rem]', color: 3 },
    { className: 'bottom-0 right-1/4 w-[24rem] h-[24rem]', color: 2 },
  ],
  footer: [
    { className: '-bottom-40 left-10 w-[24rem] h-[24rem]', color: 2 },
    { className: '-bottom-40 right-10 w-[22rem] h-[22rem]', color: 1 },
  ],
}

/** Static pools of coloured light behind glass panels. Static on purpose: animating
 *  large blurred layers under backdrop-filter is expensive and distracting. */
export default function Ambient({ preset }: { preset: keyof typeof presets }) {
  return (
    <div className="ambient" aria-hidden="true">
      {presets[preset].map((b, i) => (
        <span key={i} className={b.className} style={{ background: `hsl(var(--glow-${b.color}))` }} />
      ))}
    </div>
  )
}
