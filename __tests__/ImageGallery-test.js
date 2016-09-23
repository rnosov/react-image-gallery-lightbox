/**
 * ImageGallery tests for JEST
 *
 * Copyright © Oleg Nosov 2016
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import { mount } from 'enzyme';
import React from 'react';
import ImageGallery from '../src/image-gallery';

const createGallery = props =>
  mount(
    <ImageGallery
      { ...props }
    />);


describe('ImageGallery', () => {
  const galleryProps = {
    count: 3,
    path: '',
  };

  it('checks if count is 3 then 4 images will be on page (3 thumbnails and main)', () => {
    const renderedGallery = createGallery(galleryProps);
    expect(renderedGallery.find('img').length).toBe(4);
  });

  it('checks if count is 1 then 1 image will be on page (main only)', () => {
    const renderedGallery = createGallery({ ...galleryProps, count: 1 });
    expect(renderedGallery.find('img').length).toBe(1);
  });

  it('takes snapshot', () => {
    const renderedGallery = createGallery(galleryProps);
    expect(renderedGallery.html()).toMatchSnapshot();
  });
});
