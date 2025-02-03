import React from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const products = [
    {
      _id: "hjbcjbjvbdfjbvhnsn",
      name: "Leather Backpack",
      price: 4599,
      description:
        "A premium quality leather backpack crafted for both style and functionality. This backpack is made with genuine leather, offering durability and a sophisticated look. It has a spacious main compartment with padded sleeves to keep your laptop and other essentials secure. The adjustable shoulder straps ensure comfort, making it perfect for daily office commutes, weekend trips, or travel.",
      image: "https://www.pngall.com/wp-content/uploads/4/Leather-Bag-PNG.png",
      rating: 4.5,
    },
    {
      _id: "kjdsbncjksbhkgwbqwis",
      name: "Canvas Tote Bag",
      price: 1299,
      description:
        "This eco-friendly canvas tote bag is designed to be a versatile, stylish, and sustainable choice for everyday use. Made with 100% cotton canvas, it’s both lightweight and durable, ideal for carrying groceries, books, or personal items. The large, open design provides ample space, while the sturdy handles ensure comfort while carrying. Perfect for shopping, the beach, or daily errands.",
      image:
        "https://static.vecteezy.com/system/resources/previews/022/914/882/non_2x/black-leather-bag-isolated-on-transparent-background-free-png.png",
      rating: 4.2,
    },
    {
      _id: "kjdsbncjksbhkg3b2h43b",
      name: "Stylish Sling Bag",
      price: 1999,
      description:
        "This compact and trendy sling bag is designed for those who like to carry just the essentials while staying fashionable. With a sleek, modern look, the bag features an adjustable strap for a custom fit and multiple compartments to organize your phone, wallet, keys, and other small items. Whether for a casual day out, a night on the town, or a quick errand run, this sling bag offers both practicality and style.",
      image: "https://www.pngall.com/wp-content/uploads/4/Leather-Bag-PNG.png",
      rating: 4.7,
    },
    {
      _id: "uhguykjhbb3h4bhj",
      name: "Travel Duffel Bag",
      price: 3599,
      description:
        "This spacious and durable travel duffel bag is your perfect companion for weekend getaways or longer vacations. Designed with multiple compartments, it provides organized storage for your clothes, shoes, and accessories. Made from high-quality, water-resistant fabric, the bag offers long-lasting durability. The adjustable shoulder strap and soft, ergonomic handles make it easy to carry, even on the go. The roomy interior allows you to pack everything you need for a hassle-free trip.",
      image:
        "https://www.pngplay.com/wp-content/uploads/12/Messenger-Bag-No-Background.png",
      rating: 4.8,
    },
  ];

  return (
    <>
      <h1 className="my-18 text-5xl font-semibold text-center">Shopping</h1>
      <div className="grid grid-cols-3 gap-3 my-5">
        {products.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              _id={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              rating={product.rating}
              image={product.image}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllProducts;
