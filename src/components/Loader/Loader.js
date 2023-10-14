import { CirclesWithBar } from 'react-loader-spinner';
import { WrapImageGallery } from './Loader.styled';

export const spinerFunc = () => {
  return (
    <WrapImageGallery>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </WrapImageGallery>
  );
};
