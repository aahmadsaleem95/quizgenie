import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { SideMenu } from "../Components/SideMenu";
import { PageContent } from "../Components/PageContent";

export const Home = ({ PageComponent }) => {
  return (
    <div className="App">
      <Header />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent PageComponent={PageComponent}></PageContent>
      </div>
      <Footer />
    </div>
  );
};
