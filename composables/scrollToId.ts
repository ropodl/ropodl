export function useScrollTo(id: string, offset: Number) {
  const element: any = document.getElementById(id);
  const headerOffset: any = offset;
  var elementPosition: number = element.getBoundingClientRect().top;
  var offsetPosition: number =
    elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
