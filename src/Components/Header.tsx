import styled from 'styled-components';
import { useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';

import React from 'react';

export const Header = () => {
  const { token } = useContext(AppContext);
  return token ? <div>Header</div> : null;
};
