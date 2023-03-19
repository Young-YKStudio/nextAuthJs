import VerticalHeader from "./verticalHeader";
import HorizontalHeader from "./horizontalHeader";

const Header = ({path, session}) => {

  const HeaderDistributor = () => {
    if(path.includes('/dashboard')) {
      return <VerticalHeader />
    } else {
      return <HorizontalHeader path={path} session={session} />
    }
  }
  return (
    <>
      {HeaderDistributor()}
    </>
  );
}
export default Header;