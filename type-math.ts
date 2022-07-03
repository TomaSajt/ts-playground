type Reverse<T extends string> = T extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : ""
type ToCNum<T extends string, U extends string = ""> = T extends `${infer F}${infer R}` ? ToCNum<R, `${U}${U}${F extends '1' ? '*' : ''}`> : U
type First8<T extends string> = T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}${string}` ? `${A}${B}${C}${D}${E}${F}${G}${H}` : "pog"
type Make8Bit<T extends string> =
    T extends `${infer _A}${infer _B}${infer _C}${infer _D}${infer _E}${infer _F}${infer _G}${infer _H}${string}` ? Reverse<First8<Reverse<T>>> :
    T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${string}` ? `0${A}${B}${C}${D}${E}${F}${G}` :
    T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${string}` ? `00${A}${B}${C}${D}${E}${F}` :
    T extends `${infer A}${infer B}${infer C}${infer D}${infer E}${string}` ? `000${A}${B}${C}${D}${E}` :
    T extends `${infer A}${infer B}${infer C}${infer D}${string}` ? `0000${A}${B}${C}${D}` :
    T extends `${infer A}${infer B}${infer C}${string}` ? `00000${A}${B}${C}` :
    T extends `${infer A}${infer B}${string}` ? `000000${A}${B}` :
    T extends `${infer A}${string}` ? `0000000${A}` :
    `00000000`

type sbool = '0' | '1'


type Not<A extends sbool> = A extends '1' ? '0' : '1'
type Or<A extends sbool, B extends sbool> = A extends '1' ? '1' : B extends '1' ? '1' : '0'
type And<A extends sbool, B extends sbool> = A extends '0' ? '0' : B extends '0' ? '0' : '1'
type Xor<A extends sbool, B extends sbool> = A extends B ? '0' : '1'
type Nand<A extends sbool, B extends sbool> = Not<And<A, B>>
type Nor<A extends sbool, B extends sbool> = Not<Or<A, B>>
type Nxor<A extends sbool, B extends sbool> = Not<Xor<A, B>>


type AddShouldCarry<A extends sbool, B extends sbool, C extends sbool> = Nand<Nand<C, Xor<A, B>>, Nand<A, B>>
type AddShould1<A extends sbool, B extends sbool, C extends sbool> = Xor<A, Xor<B, C>>
type AddHelper<T extends string, U extends string, C extends sbool = '0'> = T extends `${infer F1 extends sbool}${infer R1}` ? U extends `${infer F2 extends sbool}${infer R2}` ? `${AddHelper<R1, R2, AddShouldCarry<F1, F2, C>>}${AddShould1<F1, F2, C>}` : '' : ''
type MultiplyHelper<T extends string, C extends string> = C extends `${infer _F}${infer R}` ? Add<T, MultiplyHelper<T, R>> : Make8Bit<'0'>
type BitwiseNegateHelper<T extends string> = T extends "" ? "" : T extends `${infer F extends sbool}${infer R}` ? `${Not<F>}${BitwiseNegateHelper<R>}` : never
type BitCompare<T extends sbool, U extends sbool> = T extends '1' ? U extends '1' ? 'e' : 'g' : U extends '1' ? 'l' : 'e'
type CompareHelper<T extends string, U extends string> = T extends '' ? 'e' : T extends `${infer F1 extends sbool}${infer R1}` ? U extends `${infer F2 extends sbool}${infer R2}` ? BitCompare<F1, F2> extends 'e' ? CompareHelper<R1, R2> : BitCompare<F1, F2> extends 'l' ? 'l' : 'g' : never : never
type Compare<T extends string, U extends string> = CompareHelper<Make8Bit<T>, Make8Bit<U>>
type DivideHelper<N extends string, D extends string, Q extends string = Make8Bit<'0'>, R extends string = N> = GreaterEqual<R, D> extends '1' ? DivideHelper<N, D, Add<Q, '1'>, Subtract<R, D>> : Q
type ModHelper<N extends string, D extends string, Q extends string = Make8Bit<'0'>, R extends string = N> = GreaterEqual<R, D> extends '1' ? ModHelper<N, D, Add<Q, '1'>, Subtract<R, D>> : R



type Add<T extends string, U extends string> = AddHelper<Reverse<Make8Bit<T>>, Reverse<Make8Bit<U>>>
type Multiply<T extends string, U extends string> = MultiplyHelper<Make8Bit<T>, ToCNum<Make8Bit<U>>>
type Subtract<T extends string, U extends string> = Add<T, Negate<U>>
type Divide<N extends string, D extends string> = DivideHelper<N, D>
type Mod<N extends string, D extends string> = ModHelper<N, D>
type BitwiseNegate<T extends string> = BitwiseNegateHelper<Make8Bit<T>>
type Negate<T extends string> = Add<BitwiseNegate<T>, '1'>
type Greater<T extends string, U extends string> = Compare<T, U> extends 'g' ? '1' : '0'
type Less<T extends string, U extends string> = Compare<T, U> extends 'l' ? '1' : '0'
type GreaterEqual<T extends string, U extends string> = Not<Less<T, U>>
type LessEqual<T extends string, U extends string> = Not<Greater<T, U>>
type Equal<T extends string, U extends string> = Compare<T, U> extends 'e' ? '1' : '0'
