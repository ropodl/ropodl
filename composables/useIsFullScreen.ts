export const useIsFullScreen = (element: any) => {
  const { isFullscreen, toggle } = useFullscreen(element);
  return ref({ isFullscreen, toggle });
};