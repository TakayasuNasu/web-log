import LRU from "lru-cache"

const cache = new LRU({
  max: 1000,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
})

export function getFromCache(key: string): any {
  return cache.get(key)
}

export function setToCache(key: string, value: any): void {
  cache.set(key, value)
}

export function clearCache(): void {
  cache.clear()
}

export function hasCache(key: string): boolean {
  return cache.has(key)
}
