fn main () {
    let mut x = 7;
    let c = & mut x;
    let y = x;
    println!("x {}", *c);
    x += y;
}