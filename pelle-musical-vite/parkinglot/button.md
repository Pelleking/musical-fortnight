Here do we have the css for the button

:root {
  --angle: 0turn;
}
@keyframes rainbow {
  100% {
    --angle: 1turn;
  }
}

@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0turn;
}

.button {
  --gray: #454449;
  --black: #32352a;
  --padding: 15px;
  --brad: 35px;
  font-size: 40px;
  display: inline-grid;
  grid-template-areas: "button";
  /* GLASS */
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--brad);
  border: 0;
  padding: var(--padding);
  --blur: 1px;
  --white: rgba(255, 255, 255, 1);
  --blackBorder: rgba(0, 0, 0, 0.2);
  box-shadow: 0 -1px var(--blur) 0 var(--white), 0 1px var(--blur) 0 var(--white),
    1px 1px var(--blur) 0 var(--blackBorder), -1px 0 var(--blur) 0 var(--blackBorder), 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  & > * {
    scale: 1;
  }
  &:active {
    &:before,
    &:after,
    .text {
      scale: 0.9;
    }
    &:after {
      --blur: 6.9px;
      --padding: 10px;
      animation-play-state: paused;
    }
  }

  &:after {
    /* GRADIENT */
    content: "";
    --offset: 10px;
    --walk: calc(var(--padding) * -1);
    width: calc(100% + var(--padding) * 2);
    height: calc(100% + var(--padding) * 2);
    z-index: -1;
    transform: translate(var(--walk), var(--walk));
    border-radius: var(--brad);
    --blur: 20px;
    filter: blur(var(--blur));
    opacity: 0.5;
    grid-area: button;
    /* Conic rainbow graident */
    animation: rainbow 3s linear infinite;
    background: conic-gradient(from var(--angle), #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
  }

  &:before {
    /* BLACK BUTTON */
    content: "";
    /* Gradient from gray to black */
    background: linear-gradient(to bottom, var(--gray), var(--black));
    grid-area: button;
    padding: 20px;
    z-index: 1;
    border-radius: calc(var(--brad) - var(--padding));
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2), 0 8px 10px 0 rgba(0, 0, 0, 0.2);
  }
  .text {
    /* BLACK CIRCLE */
    background: linear-gradient(to bottom, var(--black), var(--gray));
    border-radius: 100px;
    color: #e9e9e9;
    grid-area: button;
    padding: 15px 30px;
    margin: 20px;
    z-index: 2;
  }
}
/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/*
  10. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}

/* Custom  */

.pixelify-sans,
.button {
  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}

body {
  background: #f2f2f2;
}
.container {
  isolation: isolate;
  text-align: center;
  align-content: center;
  height: 500px;
  /* width: 500px; */
  display: grid;
  align-content: center;
  justify-content: center;
  align-items: stretch;
  justify-items: stretch;
  grid-template-rows: 50% 50%;
  & > * {
    align-content: center;
  }

  .shot {
    text-align: center;
    img {
      width: 500px;
      object-fit: contain;
      margin: auto;
    }
  }
  .stab {
    z-index: 1;
  }
}


here is the html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Keycap Button</title>
    <link rel="stylesheet" href="./base.css" />
    <link rel="stylesheet" href="./style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=VT323&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <div class="shot">
        <img src="./spec.png" alt="" />
      </div>
      <div class="stab">
        <button class="button">
          <span class="text">+ Add to cart</span>
        </button>
      </div>
    </div>
  </body>
</html>