import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import NPgrosees from 'nprogress';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import nProgress from 'nprogress';

Router.router = { push() { } };

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        }
      }
    }
  }
]

describe('<TakeMymoney/>', () => {
  it('renders and matches snappy', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait(50);
    wrapper.update();

    const checkoutButton = wrapper.find('ReactStripeCheckout');
    expect(toJSON(checkoutButton)).toMatchSnapshot();
  });

  it('creates an order onToken', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );

    const component = wrapper.find('TakeMyMoney').instance();
    // manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({ 'variables': { 'token': 'abc123' } })
  });

  it('turns the progress bar on', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait(50);
    wrapper.update();
    nProgress.start = jest.fn();

    const component = wrapper.find('TakeMyMoney').instance();
    // manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    expect(NPgrosees.start).toHaveBeenCalled();
  });

  it('routes to the order page when completed', async () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: 'xyz789' } }
    });

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TakeMyMoney />
      </MockedProvider>
    );

    await wait(50);
    wrapper.update();

    const component = wrapper.find('TakeMyMoney').instance();
    Router.router.push = jest.fn();
    // manually call onToken method
    component.onToken({ id: 'abc123' }, createOrderMock);
    await wait(50);
    wrapper.update();

    expect(Router.router.push).toHaveBeenCalledWith({ "pathname": "/order", "query": { "id": "xyz789" } });
  })
})
