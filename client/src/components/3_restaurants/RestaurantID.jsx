import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderSideBar from '../5_order/OrderSideBar';
import FoodItemCard from './FoodItemCard';

const RestaurantID = (props) => {
  let { id } = useParams();
  const [subTotal, setSubTotal] = useState(0);
  const { restaurant, setRestaurant, order, setOrder } = props;

  useEffect(() => {
    if (restaurant._id !== id) {
      axios
        .get(`/api/v1/restaurants/${id}`, {})
        .then((res) => {
          const restaurantResponse = res.data.restaurant;
          setRestaurant(restaurantResponse);
          setOrder((order) => ({
            ...order,
            restaurant: restaurantResponse._id,
            orders: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, setRestaurant, setOrder, restaurant._id]);

  const discountRate = restaurant.discount_rate * 100;

  return (
    <div className="container d-flex justify-content-between">
      <div className="col-lg-8 me-2">
        <div className="container restContainer shadow rounded-1 mb-4">
          <div
            className="ratio ratio-21x9 rounded-1"
            style={{
              height: '13rem',
              width: '100%',
              overflow: 'hidden',
              backgroundImage: `url(${restaurant?.image_cover})`,
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="container p-3 px-5">
            <h3 className="fw-bold">{restaurant?.name}</h3>
            <h5 className="text-secondary"> {restaurant?.kor_name}</h5>
            <div className="d-flex text-white align-item-center justify-content-starts">
              {restaurant.discount_rate && (
                <p className="bg-danger p-1 rounded-2 me-3">
                  DISCOUNT {discountRate}%
                </p>
              )}
              <p className="text-secondary text-center align-self-center">
                <FontAwesomeIcon
                  icon={['fas', 'star']}
                  size="sm"
                  className="text-primary me-1"
                />
                {restaurant?.ratingAverage}/5 ({restaurant?.ratingQuantity})
              </p>
            </div>
          </div>
        </div>

        <Tabs>
          <TabList>
            <Tab>Menu</Tab>
            <Tab>Review</Tab>
          </TabList>
          <TabPanel>
            <div className="container restContainer bg-warning p-4 rounded-3 active">
              {restaurant?.menuItems?.map((food) => (
                <div key={food._id} className="row-2 mb-3">
                  <FoodItemCard
                    foodItem={food}
                    order={order}
                    setOrder={setOrder}
                    setSubTotal={setSubTotal}
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="tab-pane fade">hi</div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="col-4 position-abolute right-0">
        <OrderSideBar
          restaurant={restaurant}
          order={order}
          setOrder={setOrder}
          subTotal={subTotal}
          setSubTotal={setSubTotal}
        />
      </div>
    </div>
  );
};

export default RestaurantID;
