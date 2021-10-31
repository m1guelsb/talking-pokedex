import { render, fireEvent } from "@testing-library/react"

import SearchInput from './index'


const { queryByTitle } = render(<SearchInput/>);
const srchInput = queryByTitle('searchInput');


it("searchInputRender", () => {
  expect(srchInput).toBeTruthy();
})

describe("changeInInput", () => {
  it("onChange", () => {
    fireEvent.change(srchInput, {target: {value: "testValue"}});
    expect(srchInput.value).toBe("testValue")
  })
})

