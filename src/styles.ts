export const breakpoints = {
  tablet: 769,
  desktop: 1024,
  widescreen: 1216,
  fullhd: 1408,
}

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  widescreen: `@media (min-width: ${breakpoints.widescreen}px)`,
  fullhd: `@media (min-width: ${breakpoints.fullhd}px)`,
}