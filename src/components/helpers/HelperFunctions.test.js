import { cleanString } from "./HelperFunctions";


test("cleanString", () => {
  expect(cleanString('pi\nka\fchu')).toBe('pi ka chu')
})
