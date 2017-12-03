export const breakpoints = {
  mobile: 480,
  tablet: 769,
  desktop: 1024,
  widescreen: 1216,
  fullhd: 1408,
};

export const mediaQueries = {
  xsmobile: `@media (max-width: ${breakpoints.mobile - 1}px)`,
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  widescreen: `@media (min-width: ${breakpoints.widescreen}px)`,
  fullhd: `@media (min-width: ${breakpoints.fullhd}px)`,
};
