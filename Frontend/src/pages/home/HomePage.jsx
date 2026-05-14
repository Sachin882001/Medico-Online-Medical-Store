import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <Container className="my-5">
        <Category />
        <HomePageProductCard />
        <Track />
        <Testimonial />
      </Container>
    </Layout>
  );
};

export default HomePage;
