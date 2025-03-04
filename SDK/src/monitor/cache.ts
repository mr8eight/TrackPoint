const cache : string[] = [];

export function addCache(data: string): void {
    cache.push(data);

}

export function getCache(): string[]{
    return cache;
}

export function clearCache() : void{
    cache.length = 0;
}