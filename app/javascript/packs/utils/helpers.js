export function genRandomString() {
   return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
}

export function parseTableJson(result) {
  result.map(item => {
    item.key = item.id;
    item.supplier = item.supplier ? item.supplier.name : ''
  })
  return result;
}