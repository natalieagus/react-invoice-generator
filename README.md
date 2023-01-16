# Invoice Generator - React App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

An Invoice creator project built with React. Add itemized items, configure quantity, prices, tax rates and discounts. Download Invoice as PDFs to your device. Uses [jspdf-react](https://www.npmjs.com/package/jspdf-react) to capture the data from the modal and covert it from canvas -> pdf.

### Guide
#### 1. Testing

checkout `add-tests` branch

##### UI Test
1. Render single component
2. use [`testing-library`](https://testing-library.com/docs/react-testing-library/cheatsheet/) for `react` to find elements
3. assert elements with [`jest`](https://jestjs.io/docs/expect) methods
4. run tests with
    ```sh
    npm test
    ```
- [ ] exercise: add more UI tests

##### Storybook
- able to render individual components without running whole react dev server
- able to customise different props to render components
- run with
    ```sh
    npm run storybook
    ```
- [ ] exercise: add more stories

##### Integration test
- uses cypress to emulate whole browser and user events
- uses similar methods from `testing-library`
- [ ] exercise: refactor current `findByText()` to `findByRole` for more resilient tests
- run with
    ```sh
    npm run test:e2e
    ```

#### 2. Typescript
checkout `convert-typescript` branch
1. rename file extensions from `jsx` to `tsx`, quick command 
    ```sh
    find src -name "*.jsx" -exec sh -c 'mv "$0" "${0%.jsx}.tsx"' {} \;
    ```
2. Specify types for functional components
   1. Components to use type React.FunctionComponent<> or React.FC<> with props type specific as [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) in <>
3. Specify types for props
4. Specify types for [event handlers](https://www.carlrippon.com/React-event-handlers-with-typescript/)
- [ ] exercise: convert remaining `jsx` components to typescript

#### 3. Context
- refactor current giant states to [Context](https://blog.logrocket.com/how-to-use-react-context-typescript/) to
  1. avoid [props drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/)
  2. separate logic from UI, then able to [test logic separately from UI](https://dev.to/manuartero/testing-a-react-context-provider-5cfg)
- [ ] exercise: move Currency to another context
