import { NotFound } from '../src/App';
import { render } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'

describe('NotFound', ()=>{
    test('renders content', () => {
    
      const location = {pathname :'abc'}
      const component = render(
        <NotFound location = {location}/>
      )
    //   component.debug()
    
      expect(component.container).toHaveTextContent(
        '404 - Not Found for abc!'
      )
    })
    })