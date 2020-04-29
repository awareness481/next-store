import fetch from 'node-fetch';
import { Descriptions } from 'antd';

export default function Laptop({laptop}) {
  const Item = Descriptions.Item;

  return (
    <div className='laptop'>
      <img src={laptop.image} className='laptop--image' />
      <Descriptions 
        title="Specs"
        bordered={true}
        layout="horizontal"
        column={2}
      >
        <Item label='Name'>{laptop.name}</Item>
        <Item label='Brand'>{laptop.brand}</Item>
        <Item label='CPU'>{laptop.cpu}</Item>
        <Item label='GPU'>{laptop.gpu}</Item>
        <Item label='Operating system'>{laptop.os}</Item>
        <Item label='Resolution'>{laptop.resolution}</Item>
        <Item label='Available RAM'>{laptop.ram}</Item>
        <Item label='Screen size'>{laptop.screen}</Item>
        <Item label='SSD'>
          {
            laptop.ssd ? laptop.ssd : 'Not available'
          }
        </Item>
        <Item label='Total storage'>{laptop.storage}</Item>
        <Item label='Weight'>{laptop.weight}</Item>
      </Descriptions>
    </div>
  )
  
}

export async function getStaticPaths() {
  const laptops = await fetch('http://localhost:3004/laptops').then(res => res.json());
  const response = laptops.map((laptop) => {
    return { id: laptop.id };
  })

  const paths = response.map((laptop) => ({
    params: { id: laptop.id }
  }))

  return { paths, fallback: false };
  
}

export async function getStaticProps({params}) {
  const res = await fetch(`http://localhost:3004/laptops/${params.id}`).then(res => res.json());
  const laptop = {
    id: res.id,
    name: res.name,
    brand: res.att_brand,
    cpu: res.att_cpu_details,
    image: res.image,
    price: res.price,
    gpu: res.att_gpu,
    os: res.att_os,
    resolution: res.att_pixels_x + "x" + res.att_pixels_y,
    ram: res.att_ram + "GB",
    screen: res.att_screen_size + '"',
    ssd: 0 ? undefined : res.att_ssd + "GB",
    storage: res.att_storage + "GB",
    weight: res.att_weight + " kg"
  }

  
 

  return {
    props: { laptop }
  };
}