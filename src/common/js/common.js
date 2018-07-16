export function changeStr(str, value) {
	let len = value.length
	let strArr = str.split('')

	strArr.splice(0, len, value)
	
	return strArr.join('')
}