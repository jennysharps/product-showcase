# product-showcase

## Usage
1. `git clone https://github.com/jennysharps/product-showcase.git`
2. `npm install` in root of the application
3. `npm start`
4. Go to `http://localhost:8080/` in your browser of choice

Note: For cross origin accessibility please disable cross origin restrictions in your browser. Safari: Develop/Disable Cross Origin Restrictions, Chrome: install this plugin https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

## Explanation
In my first attempt at building with React, after reading up as much as possible on best practices, I decided to break the solution down into the following components given the functional requirements:

```
- ProductShowcase
-- CategoryList
--- Category
-- SearchFilter
-- ProductList
--- Product
```

ProductShowcase is essentially a container component which controls data retrieval and loading.  It calls the category & product APIs, and handles filtering and sorting.  Since it controls data retrieval, any time data is updated which is passed as props to a child component, this triggers rendering from the top down where needed (if the virtual DOM finds a diff).

CategoryList gets passed in state data from ProductShowcase as a prop so that whenever a state change occurs to the categories data, the list will render anew. Though the categories in this case don't really change in real time, they do trigger a change onClick which affects how they're rendered as the active class needs to be cleared from all categories whenever a new category is selected, and only the newly clicked item should display as active. Rather than clear active classes with DOM traversal, the state change triggered by the callback passed to the child Category will cause the list to render in the virtual DOM. The list itself owns the logic for determining which item is active, and a prop is passed to each child Category component which determines whether the Category displays as active or not. No logic is done in the lower-level Category itself, which makes the component more flexible (a different parent component passing in a different callback could result in different behavior entirely).

SearchFilter is configurable and controlled by the container element by passing down callbacks for it as props.  Since ProductShowcase passes through a callback for the 'onChange' event which triggers a state change, this allows the products list to be filtered by whatever string the user inputs and then render any changes to the product list.

ProductList, similar to CategoryList, gets passed state data from ProductShowcase as a prop so that whenever a state change occurs to the products data, the list will render anew and display any changes. This component benefits most from the re-rendering on prodcts change as its data is affected by the container componenet, by the SearchFilter, and by interaction with CategoryList. Unlike Category in relation to CategoryList, ProductList doesn't hold any logic about the individual Product component as the active state of the Product component only ever affects/is affected by interaction with that Product itself. On clicking a Product, its state becomes active, and that can only change again upon clicking that product again rather than change being triggered by other components.  If the functional requirement for that should change, it might be best to move the logic for determining the Product state to whichever is the highest level component that affects it.