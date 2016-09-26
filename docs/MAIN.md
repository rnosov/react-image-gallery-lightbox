
##Demo

Live demo: [`https://www.solarleague.org/shop/macbook-case/`](https://www.solarleague.org/shop/macbook-case/)

**Usage**
```shell
npm install --save react-image-gallery-lightbox
```

**Example**
```javascript
import React from 'react';
import ImageGallery from 'react-image-gallery-lightbox';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-image-gallery-lightbox/dist/image-gallery.css';
// If you have 3 instances(small, medium, big) of two images
// in folder /images/ like
//
// /images/1-85x50.jpeg,
// /images/1-680x400.jpeg,
// /images/1-1920x1080.jpeg
//
// /images/2-85x50.jpeg,
// /images/2-680x400.jpeg,
// /images/2-1920x1080.jpeg
<ImageGallery count={2} path="/images/" sizes={['85x50', '680x400', '1920x1080']}>
  <h3> Text content </h3>
</ImageGallery>
  // to show all of them
<ImageGallery count={1} path="/images/" sizes={['85x50', '680x400', '1920x1080']}>
  <h3> Text content </h3>
</ImageGallery>
  // to show only one image from list
// Of course you can specify each path as you wish
<ImageGallery
  srcList={[
    [
      '/images/1-85x50.jpeg',
      '/images/1-680x400.jpeg',
      '/images/1-1920x1080.jpeg'
    ],
    [
      '/images/2-85x50.jpeg',
      '/images/2-680x400.jpeg',
      '/images/2-1920x1080.jpeg'
    ]
  ]}
>
  <h3> Text content </h3>
</ImageGallery>
```

##Development

**Build**

```shell
npm run build
```
And then check dist folder


**Testing**

[Jest](https://github.com/facebook/jest) is used for tests
```shell
npm run test
```

**Linter**

[ESLint](https://github.com/eslint/eslint) is used as linter
```shell
npm run lint
```

**Flow Type**

Check types in project using [Flow](https://github.com/facebook/flow)
```shell
npm run flow
```

**Autodoc**

Generate doc using [documentation js](https://github.com/documentationjs/documentation)
```shell
npm run doc
```
And then look at README.md
