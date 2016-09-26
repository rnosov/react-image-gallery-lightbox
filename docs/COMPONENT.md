# ImageGallery

## propTypes

**Properties**

-   `srcList` **Array&lt;Array&lt;string&gt;&gt;** All gallery image paths.
    If you use this prop, don't specify count and sizes - they will
    be ignored.
    That array may contain 0-4 arrays of 3 strings.
    Each array of 3 strings - is an array of 3 image sizes paths,
    ['pathToSmallCat.jpeg', 'pathToMediumCat.jpeg', 'pathToBigCat.jpeg'] for example.
    Default is an empty array
-   `count` **number** Image count.
    Max value is 4, min is 0.
    Default is 0
-   `path` **string** Path to images. Default is an empty string
-   `sizes` **Array&lt;string&gt;** Array of image sizes.
    Must contain 3 elements:
    1st - small image (thumbnail),
    2nd - medium image (main in gallery),
    3rd - big image (lightbox preview).
    Default is ['102x68', '483x321', '800x533']
