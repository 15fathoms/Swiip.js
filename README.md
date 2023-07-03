# Swiip.js

A minimalist carousel library built with pure JavaScript, CSS grid and ❤️.

## What is Swiip.js ?

Swiip.js is a lightweight carousel library written in vanilla JavaScript. It offers a straightforward and customizable solution for implementing carousels on web pages.
Designed with seamless integration in mind, Swiip.js can be easily incorporated into your vanilla JavaScript projects.

Notably, Swiip.js is designed to function on mobile devices, ensuring a smooth user experience across different platforms.

## How to use

### HTML

the html structure to use Swiip.js is the following :

```html
<div class="container">
    <div class="item">
        <img src="img1.jpg" alt="img1">
    </div>
    <div class="item">
        <img src="img2.jpg" alt="img2">
    </div>
    <div class="item">
        <img src="img3.jpg" alt="img3">
    </div>
    <div class="item">
        <img src="img4.jpg" alt="img4">
    </div>
</div>
```

### Basic usage

Here is the basic usage of Swiip.js :

```javascript
const container = document.querySelector(".container");
container.Swiip();
```
Basic swiip.js usage will use the default options.
**IMPORTANT :** Basic usage assume that you have at least 4 items in your container.


### Options

Here is a table of the options, types, default values, and a brief description of each option:

| Option | Types | Default value | Description |
| --- | --- | --- | --- |
| `slidesToScroll` | Any positive Number | `1` | The number of slides to scroll when the user clicks the next or previous button or when autoplay is enabled. Can't exceed `slidesVisible` value|
| `slidesVisible` | Any positive Number | `4` | The number of visible slides at a time. **Can't exceed the number of children from targeted element**|
| `autoPlay` | `true` or `false` | `false` | Determines whether the carousel automatically plays or not. |
| `autoPlaySpeed` | Any positive Number | `3000` | The speed in milliseconds between autoplay transitions. |
| `gap` | Any positive number | `0` | The gap between slides. (rem unit) |
| `responsive` | An array of objects | See below | An array of objects representing the responsive behavior of the carousel at different breakpoints. |

The `responsive` array contains objects representing the responsive behavior of the carousel at different breakpoints. Each object in the array should have the following properties:

| Property | Types | Description |
| --- | --- | --- |
| `breakpoint` | Any positive Number | The maximum width of the viewport at which the responsive behavior takes effect. |
| `slidesToScroll` | Any positive Number | The number of slides to scroll at this breakpoint. |
| `slidesVisible` | Any positive Number | The number of visible slides at a time at this breakpoint. |
| `autoPlay` | `true` or `false` | Whether autoplay is enabled at this breakpoint. |
| `autoPlaySpeed` | Any positive Number | The speed in milliseconds between autoplay transitions at this breakpoint. |
| `gap` | Any positive number | The gap between slides at this breakpoint. (rem unit)|
This will create a carousel that shows 3 slides at a time, scrolls 2 slides at a time, has a gap of 1 rem between slides, and automatically plays the slides every 5 seconds. The carousel will also adjust its options for different screen sizes.


**Important :** 

- The breakpoints must be in order from the largest to the smallest.
- The number of visible slides must be equal or greater than the `SlidesToScroll` value.
- The number of slides to scroll must be equal or greater than `1` and not exceed the ``slidesVisible` value.
- The number of visible slides must be equal or greater than `1` and must not exceed the numbers of items in targeted container.

if you don't respect these rules, Swiip will not work properly.


**Exemple :**

```javascript
const container = document.querySelector(".container");
container.Swiip({
    prevBtn: ".prev", // the class of the previous button
    nextBtn: ".next", // the class of the next button
    slidesToScroll: 1,
    slidesVisible: 4,
    autoPlay: true,
    autoPlaySpeed: 3000,
    gap: 0,
    responsive: [
        {
            breakpoint: 1024,
            slidesToScroll: 1,
            slidesVisible: 3,
            gap: 1,
            autoPlay: true,
            autoPlaySpeed: 3000
        },
        {
            breakpoint: 768,
            slidesToScroll: 1,
            slidesVisible: 2,
            gap: 1,
            autoPlay: true,
            autoPlaySpeed: 2000
        },
        {
            breakpoint: 576,
            slidesToScroll: 1,
            slidesVisible: 2,
            gap: 1,
            autoPlay: true,
            autoPlaySpeed: 2000
        },
        {
            breakpoint: 400,
            slidesToScroll: 1,
            slidesVisible: 1,
            gap: 1,
            autoPlay: true,
            autoPlaySpeed: 2000
        }
    ]
});
```

## Developer's note

Swiip.js is a library I developed for both personal and professional projects. While I am aware that there are already numerous carousel librarys available, I wanted to create my own.
Many carousel libraries rely on jQuery, have dependencies, or lack responsiveness. I believed it would be a great idea to develop a carousel library using pure JavaScript that is also fully responsive.
Carousels are mainly built using flexbox, but I wanted to challenge myself by using CSS grid instead. I also wanted to make sure that the library would be easy to use and integrate into any project.
As a result, Swiip.js was born.

I understand that this library may not be flawless, but I am committed to improving it in the future.
If you have any suggestions, ideas, or come across any bugs, please don't hesitate to reach out to me.
You can contact me here : [FATHOMS](mailto:fathoms.contact@gmail.com).

## License

Swiip.js is under the MIT license.

## Author

Swiip.js was created by Emmanuel CARTELLI
