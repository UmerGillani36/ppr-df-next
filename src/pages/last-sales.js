import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { setSyntheticLeadingComments } from 'typescript';
const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(
    'https://next-course-ef833-default-rtdb.firebaseio.com/sales.json'
  );
  useEffect(() => {
    if (data) {
      const transformData = [];
      for (let key in data) {
        transformData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformData);
    }
  }, [data]);
  //   useEffect(() => {
  //     setLoading(true);
  //     fetch('https://next-course-ef833-default-rtdb.firebaseio.com/sales.json')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformData = [];
  //         for (let key in data) {
  //           transformData.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformData);
  //         setLoading(false);
  //       });
  //   }, []);
  if (error) {
    return <p>Something went wrong</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul>
        {sales?.map((sale) => (
          <li key={sale.id}>
            {sale.username}- ${sale.volume}
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    'https://next-course-ef833-default-rtdb.firebaseio.com/sales.json'
  );
  const data = await response.json();

  const transformData = [];
  for (let key in data) {
    transformData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return { props: { sales: transformData }, revalidate: 10 };
}
export default LastSalesPage;
