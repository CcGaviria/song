/*
 * Cristian Gaviria - Cristian@gaviria.org
 * https://music.gaviria.org | Test La Manicurista (Tualy) | F! solo te roban el código :)
 * Copyright (c) 2012 - 2021. https://gaviria.org
 *
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SongApp from './SongApp';

test('renders links of pages', () => {
  render(<SongApp />);
  const linkElementSearch = screen.getByText(/^Search$/i);
  const linkElementHome = screen.getByText(/Home/i);
  const linkElementAbout = screen.getByText(/About/i);
  const links = [linkElementSearch, linkElementHome, linkElementAbout];
  links.forEach((link) => {
    expect(link).toBeInTheDocument();
  });
});

test('renders filters of search', () => {
  render(<SongApp />);
  const textElementTrack = screen.getByText(/Track/i);
  const textElementAlbum = screen.getByText(/Album/i);
  const textElementArtist = screen.getByText(/Artist/i);
  const texts = [textElementTrack, textElementAlbum, textElementArtist];
  texts.forEach((txt) => {
    expect(txt).toBeInTheDocument();
  });
});

test('search Camilo', () => {
  render(<SongApp />);

  userEvent.type(screen.getByPlaceholderText('Search something..'), 'Camilo');
  userEvent.click(screen.getByAltText('btn_on_search'))
  //userEvent.click(btnElementSearch)


});
