export const breakpoint = (width: string, content: string) => {
  return `
    @media (min-width: ${width}px) and (min-height: 300px) {
      ${content}
    }
  `
}
