# Tygr ComponentLibrary

[Demo](https://tylergrinn.github.io/tygr-component-library)

[Forking Guide](docs/forking.md)

This is a react component packaged for three environments: node, browser, and standalone.

- Node is reccommended. If you are already using react in the project, this library simply exports a react component function you can use directly in jsx.

- Browser is for fast prototyping in the browser. You can add this component via a script tag. The react and react-dom script tags must be placed before the component script.

- Standalone is for projects that do not use react. It exposes the `mount` function, which takes an HTML element.

## Node

Installation:

```cmd
npm i --save @tygr/component-library
```

Usage (jsx):

```jsx
import ComponentLibrary from '@tygr/component-library';

// Import styles. Make sure there is a style loader specified in your
// webpack config
import '@tygr/component-library/lib/tygr-component-library.min.css';

export default function MyComponent() {
  return (
    <div>
      <h1>ComponentLibrary usage example</h1>
      <ComponentLibrary />
    </div>
  );
}
```

## Browser

Usage:

When included via script tag, the component is exposed as a window library named 'TygrComponentLibrary'

```html
<html>
  <head>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script src="https://tylergrinn.github.io/tygr-component-library/lib/tygr-component-library.min.js"></script>
    <link
      rel="stylesheet"
      href="https://tylergrinn.github.io/tygr-component-library/lib/tygr-component-library.min.css"
    />
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      ReactDOM.render(<TygrComponentLibrary />, document.getElementById('app'));
    </script>
  </body>
</html>
```

## Standalone

Installation:

```cmd
npm i --save @tygr/component-library
```

Usage:

```jsx

// Vanilla JS
import ComponentLibrary from '@tygr/component-library/lib/standalone';

const el = document.getElementById('tygr-component-library');

ComponentLibrary.mount(el);

// Vue
<template>
<div>
  <div ref="tygr-component-library"></div>
</div>
</template>

<script>
import ComponentLibrary from '@tygr/component-library/lib/standalone';

export default {
  mounted() {
    ComponentLibrary.mount(this.$refs['tygr-component-library']);
  },
};
</script>

// Angular Typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import ComponentLibrary from '@tygr/component-library/lib/standalone';

@Component({
  selector: 'app-root',
  template: '<div><div #tygr-component-library></div></div>',
})
export class ComponentLibraryComponent  {
  @ViewChild('tygr-component-library') el: ElementRef;

  ngAfterViewInit() {
    ComponentLibrary.mount(this.el.nativeElement);
  }
}
```

You should not use the standalone version if you have multiple react components in your project.

## Customizing styles

Sass variables can be overridden if you accept responsibility for transpiling it into css. You can see an example of this setup in the `demo/webpack.config.js` configuration named `sass`.

Make sure to reassign any sass variables before importing the `sass` library:

```scss
$accent-1: white;
$accent-2: yellow;

@import '@tygr/component-library/sass';
```
