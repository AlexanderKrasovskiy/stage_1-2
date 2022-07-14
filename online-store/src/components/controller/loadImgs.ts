const cache: Record<string, string> = {};

export function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
