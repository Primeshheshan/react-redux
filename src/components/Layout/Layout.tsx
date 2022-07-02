import { Fragment } from 'react';
import MainHeader from './mainHeader/MainHeader';

const Layout = (props: any) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
