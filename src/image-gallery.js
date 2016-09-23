/**
 * @flow
 * @module ImageGallery
 * @extends React.Component
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * React Component that represents an image gallery,
 * consists of 1-4 images.
 *
 * You can use count + path + sizes props or
 * srcList + path props to create gallery
 *
 * In order to use count + path + sizes template
 * each image must have name in the format:
 *
 * {path}/{imageNumber}-{size}.jpeg.
 *
 * Else you can hardcode each path using srcList prop.
 *
 */
import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-image-lightbox-universal';
import Portal from 'react-portal';

const effect = 'image-gallery-effect';

const
  /**
   * @static propTypes
   * @memberof ImageGallery
   * @prop {Array<Array<string>>} srcList - All gallery image paths.
   * If you use this prop, don't specify count and sizes - they will
   * be ignored.
   * That array may contain 0-4 arrays of 3 strings.
   * Each array of 3 strings - is an array of 3 image sizes paths,
   * ['pathToSmallCat.jpeg', 'pathToMediumCat.jpeg', 'pathToBigCat.jpeg'] for example.
   * Default is an empty array
   * @prop {number} count - Image count.
   * Max value is 4, min is 0.
   * Default is 0
   * @prop {string} path - Path to images. Default is an empty string
   * @prop {Array<string>} sizes - Array of image sizes.
   * Must contain 3 elements:
   * 1st - small image (thumbnail),
   * 2nd - medium image (main in gallery),
   * 3rd - big image (lightbox preview).
   * Default is ['102x68', '483x321', '800x533']
   */
  propTypes = {
    srcList: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.string)
    ),
    count: PropTypes.oneOf([0, 1, 2, 3, 4]),
    path: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
  },
  defaultProps = {
    srcList: [],
    count: 0,
    path: '',
    sizes: ['102x68', '483x321', '800x533'],
  };

export default class ImageGallery extends Component {

  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    selectedImage: 1,
    isLightboxOpen: false,
    isMainImageLoaded: false,
  };

  /*
   * When main image is loaded, need to wait several seconds
   * before updating state in order to react could rerender
   * html tree and animation being played
   */
  onMainImageLoad = () => {
    setTimeout(() => this.setState({ isMainImageLoaded: true }), 50);
  }

  onLightboxClose = () => {
    this.setState({ isLightboxOpen: false });
  }


  getNextImage = () : number => {
    const { selectedImage } = this.state;
    return selectedImage === this.count ?
        1 : selectedImage + 1;
  }

  getPrevImage = () : number => {
    const { selectedImage } = this.state;
    return selectedImage - 1 ?
        selectedImage - 1 : this.count;
  }

  openLightbox = () => {
    this.setState({ isLightboxOpen: true });
  }

  selectImage = (imageNumber : number) => {
    this.state.selectedImage !== imageNumber
      &&
      this.setState({ selectedImage: imageNumber, isMainImageLoaded: false });
  }

  /*
   * Changes current selected image number
   * to next
   */
  moveNext = () => {
    this.setState({ selectedImage: this.getNextImage() });
  }

  /*
   * Changes current selected image number
   * to previous
   */
  movePrev = () => {
    this.setState({ selectedImage: this.getPrevImage() });
  }

  /*
   * If srcList prop passed, use its length as image count
   * else use count prop
   */
  get count() : number {
    return this.props.srcList.length || this.props.count;
  }

  render() {
    const { sizes, path, srcList } = this.props;

    const count = this.count;

    // Dynamically calculate number of thumbnails to be shown
    const imagesBlocksCount = (12 / count | 0);

    /*
     * Create map in format:
     * { [sizeName] : [paths to images with this size] }
     */
    const sizeNames = ['small', 'medium', 'big'];
    const srcs = sizeNames.reduce((obj, size, key) =>
      ({
        ...obj,
        [size]:
          srcList.length
            ?
            srcList.map(v => path + v[key])
            :
            Array.from({ length: count }, (v, k) =>
              path + `${k + 1}-${sizes[key]}.jpeg`
            ),
      })
    , {});
    /*
     * If only one image prodided, don't show thumbnails at all
     */
    const imagesThumbnails = count - 1 ? Array.from({ length: count }, (v, n) => {
      const k = n + 1;
      return (
        <div
          key={ k }
          className={
            `col-xs-${imagesBlocksCount}
            col-md-${imagesBlocksCount}
            text-xs-center`
          }
        >
          <img
            onClick={ () => this.selectImage(k) }
            role="button"
            src={ srcs.small[n] }
            className={ 'img-fluid img-thumbnail m-b-1' + (k === this.state.selectedImage && ' image-gallery-selected' || '') }
          />
        </div>
      );
    }) : [];
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-5 col-lg-6">
            {
              /*
               * If no images provided, hide gallery
               */
              count ?
                <div>
                  <div className="text-xs-center m-b-1">
                    <img
                      onLoad={ this.onMainImageLoad }
                      role="button"
                      className={ 'img-fluid m-x-auto d-block ' + (this.state.isMainImageLoaded ? effect : '') }
                      src={ srcs.medium[this.state.selectedImage - 1] }
                      onClick={ this.openLightbox }
                    />
                  </div>
                  <div className="row">
                    { imagesThumbnails }
                  </div>
                </div> : void 0
            }
          </div>
          <div className="col-xs-12 col-sm-6 col-md-7 col-lg-6">
            { this.props.children }
          </div>
        </div>
        {
          /*
           * If no images provided, don't create lightbox
           */
          count ?
            <Portal isOpened={ this.state.isLightboxOpen } >
              <Lightbox
                mainSrc={ srcs.big[this.state.selectedImage - 1] }
                nextSrc={ count - 1 && srcs.big[this.getNextImage() - 1] || void 0 }
                prevSrc={ count - 1 && srcs.big[this.getPrevImage() - 1] || void 0 }
                onMovePrevRequest={ this.movePrev }
                onMoveNextRequest={ this.moveNext }
                onCloseRequest={ this.onLightboxClose }
              />
            </Portal> : void 0
         }
      </div>
    );
  }
}
