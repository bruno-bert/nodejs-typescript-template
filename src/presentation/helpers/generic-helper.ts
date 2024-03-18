/* eslint-disable @typescript-eslint/no-dynamic-delete */
export const objectWithoutProperty = (
  object: any,
  properties: string[],
): any => {
  let obj = object

  for (const field of properties) {
    obj = Object.assign({}, delete obj[field], obj)
  }

  return obj
}
