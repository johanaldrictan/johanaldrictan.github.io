---
title: "Project 1"
excerpt: "This is a program that plays drum hits as you type your name with a surprise at
the end when you press enter. This project is done purely through Javascript's
Web API"
collection: campprojects
author_profile: false
---
<script src="{{ site.baseurl }}{% link _campprojects/js/simplesynth.js %}"></script>
<script src="{{ site.baseurl }}{% link _campprojects/js/project-1.js %}"></script>

## Type Your Name!

<div>
<p id="name"> Your name will show up here. Just start typing! </p>
</div>

### About the algorithm

 When you start to type, the algorithm takes into consideration the starting letter of your first name. Through the first letter of your first name, the algorithm decides the key of the chord it will build as well as determine whether the chord will be major or minor.

Once the key of the chord is decided, the algorithm then stacks notes for the chord according to the scale where the determined chord is the root of. It will stack notes according to the 1,3,5,7,... and so on degrees of the scale.

Once a space is pressed, the mode of the oscillator switches into a short tone which will play randomized notes within the scale as you type.
