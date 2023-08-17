'use client';

export function PlaceHolderImage() {
  return (
    <svg className="stroke-gray-900/10 stroke-2 dark:stroke-gray-100/10 w-full h-full" fill="none">
      <defs>
        <pattern id="pattern-b4126363-2260-432a-9ef3-4e9b56aecbec" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
        </pattern>
      </defs>
      <rect stroke="none" fill="url(#pattern-b4126363-2260-432a-9ef3-4e9b56aecbec)" width="100%" height="100%"></rect>
    </svg>
  );
}
