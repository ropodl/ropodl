export default function (element: any) {
  const { isFullscreen, toggle } = useFullscreen(element);
  return ref({ isFullscreen, toggle });
};