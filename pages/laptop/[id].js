import fetch from 'node-fetch';
// import { useRouter } from 'next/router'

export default function Laptop({laptop}) {
  return (
    <div className='laptop'>
      <h1>{laptop.name}</h1>
      <ul>
        <li>{laptop.id}</li>
        <li><img src={laptop.image} /></li>
      </ul>
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
    // cpu: laptop.att_cpu_details,
    image: res.image
  }

  
 

  return {
    props: { laptop }
  };
}