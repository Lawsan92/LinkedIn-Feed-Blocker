# LinkedIn Feed Blocker

Chrome extension that hides suggested posts from the LinkedIn news feed. Filters dynamic LinkedIn feed content in real time by traversing nested DOM structures and handling asynchronous updates using the `MutationObserver`. DOM elements are hidden by updating their `display` style property, rather than removing the elemens from the tree, allowing posts to be hidden/unhidden.

<img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1777438517/Group_17_i4hafz.png' height='200'/>

### User Guide

Each switch filters posts based on post type. Toggle the switch to hide the post; you can unhide posts by toggling the switch back to the OFF position (RIGHT = ON, OFF = LEFT)

<img src='https://res.cloudinary.com/ducqdbpaw/image/upload/v1778942787/Screenshot_2026-05-16_at_09.46.20_agfxzq.jpg'/>

### TechStack

![JavaScript](https://img.shields.io/badge/JavaScript-grey?logo=javascript)
![Google Chrome](https://img.shields.io/badge/Chrome-grey?logo=googlechrome&logoColor=blue)
