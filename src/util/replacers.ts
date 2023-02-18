type searchValue = string | RegExp;
type replaceValue = string;

type replacesInterface = [searchValue, replaceValue]
export const replacer = (hash:string):Array<replacesInterface> => [
  // Rettle Original
  ["rettle-ref", `data-ref-${hash}`],
  // Other Events
  ["rettle-scroll", `data-scroll-${hash}`],
  ["rettle-resize", `data-resize-${hash}`],
  ["rettle-load", `data-load-${hash}`],
  // Mouse Events
  ["rettle-click", `data-click-${hash}`],
  ["rettle-mouseenter", `data-mouseenter-${hash}`],
  ["rettle-mouseleave", `data-mouseleave-${hash}`],
  ["rettle-mouseover", `data-mouseover-${hash}`],
  ["rettle-mousedown", `data-mousedown-${hash}`],
  ["rettle-mouseup", `data-mouseup-${hash}`],
  ["rettle-mouseout", `data-mouseout-${hash}`],
  ["rettle-mousemove", `data-mousemove-${hash}`],
  ["rettle-dblclick", `data-dblclick-${hash}`],
  // Dom Events
  ["rettle-DOMFocusIn", `data-DOMFocusIn-${hash}`],
  ["rettle-DOMFocusOut", `data-DOMFocusOut-${hash}`],
  ["rettle-DOMActivate", `data-DOMActivate-${hash}`],
  // Inputs Events
  ["rettle-change", `data-change-${hash}`],
  ["rettle-select", `data-select-${hash}`],
  ["rettle-submit", `data-submit-${hash}`],
  ["rettle-reset", `data-reset-${hash}`],
  ["rettle-focus", `data-focus-${hash}`],
  ["rettle-blur", `data-blur-${hash}`],
  // Keyboard Events
  ["rettle-keypress", `data-keypress-${hash}`],
  ["rettle-keydown", `data-keydown-${hash}`],
  ["rettle-keyup", `data-keyup-${hash}`],
]