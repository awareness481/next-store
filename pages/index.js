import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import LaptopThumbnail from "../components/LaptopThumbnail";
import { List } from 'antd';

const Home = ({ laptops }) => {
  // const router = useRouter();
  const [data, setData] = useState("none");
  const [laptopBrand, setLaptopBrand] = useState("Lenovo");

  useEffect(() => {
    const filteredLaptops = laptops.filter((laptop) => {
      return laptop.brand === laptopBrand;
    });

    setData(filteredLaptops);
  }, [laptopBrand]);

  return (
    <div className="Home">
      <Head>
        <title>Home</title>
      </Head>
      <div className="select-brand">
        <label htmlFor="laptop-brand-select">Select a brand:</label>
        <select
          name="brand"
          id="laptop-brand-select"
          className="select-brand__dropdown"
          value={laptopBrand}
          onChange={(e) => setLaptopBrand(e.target.value)}
        >
          <option value="Lenovo">Lenovo</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
        </select>
      </div>
      <div className="results">
        <List 
          grid={{ gutter: 8, column: 5 }}
          size='large'
          pagination={{
            pageSize: 10,
            total: data.length,
            data: data,
            size: 'small'
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.name}
              extra={
                <LaptopThumbnail 
                  name={item.base}
                  image={item.image}
                  id={item.id}
                />
              }
            />)
          }
        />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("http://localhost:3004/laptops").then((res) =>
    res.json()
  );
  const laptops = response.map((laptop) => {
    return {
      id: laptop.id,
      name: laptop.name,
      base: laptop.att_base_name,
      brand: laptop.att_brand,
      image: laptop.image,
    };
  });

  return {
    props: {
      laptops,
    },
  };
}

export default Home;
