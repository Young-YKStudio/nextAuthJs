import VerticalHeader from "./verticalHeader";
import HorizontalHeader from "./horizontalHeader";

const Header = ({path, session}) => {

  const HeaderDistributor = () => {
    if(path.includes('/dashboard')) {
      return <VerticalHeader path={path} />
    } else {
      return <HorizontalHeader path={path} />
    }
  }
  return (
    <>
      {HeaderDistributor()}
    </>
  );
}
export default Header;