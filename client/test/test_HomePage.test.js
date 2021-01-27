import { HomePage } from '../src/HomePage';
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

const mock_items = [{id: 1, name: "test_places", address: 'here', opening_hours: 'unknown', opening_hours_exception:'N/A'}]
const mock_pager = {
    totalItems: '2350',
    currentPage: 2,
    pageSize: 10,
    totalPages: 235,
    startPage: 1,
    endPage: 10,
    startIndex: 10,
    endIndex: 19,
    pages: [
       1,  2,  3,
       4,  5,  6,
       7,  8,  9,
      10
    ]
  }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ pager, pageOfItems }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('HomePage', ()=>{
    test('renders content', () => {

        const component = render(
          <HomePage/>
        )

        expect(component.container).toHaveTextContent(
          'Places in Helsinki'
        )
      })

})

