import { useLoaderData } from "react-router-dom";
import Card from "./card";
import "./gallery.css";

const Gallery = () => {
  const { data: products } = useLoaderData();
  return (
    <section className="gallery">
      {products &&
        products.map((product) => <Card key={product._id} product={product} />)}
    </section>
  );
};

export default Gallery;
