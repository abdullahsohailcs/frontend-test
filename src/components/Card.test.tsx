// src/components/Card.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Card from './card';

// Sample props to render the component
const cardProps = {
  title: "Docker Swarm",
  description: "Native clustering for Docker. Turn a pool of Docker hosts into a single, virtual host.",
  image: "https://via.placeholder.com/100",
  url: "https://github.com/docker-archive/classicswarm",
};

describe('Card Component', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<Card {...cardProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
