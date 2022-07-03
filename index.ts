import compose from "./compose"

let check_oneness = compose<[number, number, number, number, number, boolean, string]>(n => n + 10, n => n * 2, n => n + 1, n => n * 3, n => n == 69, b => b ? "NICE" : "NOT NICE")
console.log(check_oneness(1))
