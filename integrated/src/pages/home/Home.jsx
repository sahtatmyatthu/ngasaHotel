import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import FeaturedProperty from "../../components/featuredProperty/FeaturedProperty"
import PropertyList from "../../components/propertyList/PropertyList"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Browse by Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love </h1>
        <FeaturedProperty />
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
