# React Real Estate UI Design

1. we are using sass instead of css 

CSS: The standard language for styling HTML documents. It is used to control layout, color, font, and overall design.
SASS: A CSS preprocessor that extends the functionality of CSS by adding features like variables, nesting, and mixins, making it easier to manage large stylesheets.


using sass
$bg-color: white;

.container {
    color: blue;
    background: $bg-color;
}
we can make variables 

with sass we can do nesting
.nav {
    color: red;
    ul {
        padding: 10px;
    }
}


using useState const [open , setOpen]=useState(false) open will be true the hamburger menu will have menu and active class otherwise only menu.


search bar has a usestate query that stores the current type buy or rent and details related to it

the types array is used to map and display tha buttons buy and rent instead of writing redundantly . once any button is clicked its type gets passes to switchtype function and it changes the type of the query state keeping other values same


in list page we r using dummy data values for now to fetch and display . the dummydata r in lib folder which is declared as an arry of objects and exported.


in card .sx we are receiving the prop item and linking each img to the item id using Link of react-router-dom each item will have link to its single page with id /:id as parameter hense we are writing /${item.id} 