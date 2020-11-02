import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import Item from '../components/styles/ItemStyles';

const fakeItem = {
  id: 'ABC123',
  title: 'A cool item',
  description: 'Super cool item',
  price: 5000,
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
}

describe('<Item />', () => {
  it('renders the PriceTag and title properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');

    expect(PriceTag.children().text()).toBe('$50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  })

  it('renders the image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');

    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders the button properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);

    const buttonList = wrapper.find('.buttonList');
    console.log(buttonList.children());

    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toBeTruthy();
    expect(buttonList.find('AddToCart')).toBeTruthy();
    expect(buttonList.find('DeleteItem')).toBeTruthy();
  });
});
