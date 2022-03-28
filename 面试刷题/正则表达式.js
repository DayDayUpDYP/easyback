
// 1 使用RegExp对象来创建 正则表达式
var regexp = new RegExp(/123/)
console.log(regexp);

// 2 使用字面量创建
var rg = /123/

// 量词符
/* * 表示0到很多次 */
var reg = /^a*$/;
console.log(reg.test('')); //true
console.log(reg.test('a'));
console.log(reg.test('aaaa'));
console.log(reg.test('aba'));

/* +表示最少都要一次 */
var reg2 = /^a+$/
console.log(reg2.test('')) //false

/* ?表示 1||0 */
var reg3 = /^a?$/

console.log(reg3.test('')) //true
console.log(reg3.test('a')) //true
console.log(reg3.test('aa')) //false
// replace方法 正
const str = 'andthenima'
var newStr = str.replace(/aa/,'nima')
console.log(newStr)


