import Order, { SINGLE_ORDER_QUERY } from '../components/Order';
import { mount } from 'enzyme';
import wait from 'waait';
// import Item from '../components/styles/ItemStyles';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeOrder } from '../lib/testUtils';

const mocks = [
  {
    // when someone makes a request with this query and variable combo
    request: { query: SINGLE_ORDER_QUERY, variables: { id: 'ord123' } },
    // return this fake data (mocked data)
    result: {
      data: {
        order: fakeOrder()
      }
    }
  }
];

describe('<Order />', () => {
  it('renders with proper data', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Order id="ord123" />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find('[data-test="order-id"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-test="order-charge"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-test="order-date"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-test="order-total"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-test="order-count"]'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('[data-test="order-items"]'))).toMatchSnapshot();
    expect(wrapper.find('[data-test="order-items"]')).toHaveLength(1);
  });
});
