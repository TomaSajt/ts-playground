type Prev<T extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62][T];
type Length<T extends any[]> = T extends { length: infer L } ? L : never
type Last<T extends any[]> = T[Prev<Length<T>>]
type Cons<F, T extends any[]> = ((f: F, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
type Rest<T extends any[]> = T extends [f: any, ...r: infer R] ? R : never
type FuncChain<T extends any[]> = Length<T> extends 0 ? never : Length<T> extends 1 ? [] : Cons<(a: T[0]) => T[1], FuncChain<Rest<T>>>
type FLFunc<T extends any[]> = Length<T> extends 0 ? never : (a: T[0]) => Last<T>
export default function compose<T extends any[]>(...arg: FuncChain<T>) {
    let comp = (x: any) => x
    for (let i = 0; i < arg.length; i++) {
        let curr = arg[i] as any
        let f = comp
        comp = (x: any) => curr(f(x))
    }
    return comp as FLFunc<T>
}
