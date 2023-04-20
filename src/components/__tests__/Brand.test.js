import Brand from "../Brand";

// Tests that the function renders a Link component with a logo and name.
it("test_renders_link_with_logo_and_name", () => {
    const wrapper = shallow(<Brand to="/home" logoPath="https://example.com/logo.png" name="Example" />);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual("Example");
});

// Tests that the Link component is not rendered if the to prop is not provided.
it("test_no_to_prop", () => {
    const wrapper = shallow(<Brand logoPath="https://example.com/logo.png" name="Example" />);
    expect(wrapper.find(Link)).toHaveLength(0);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual("Example");
});

// Tests that the function renders the logo image and Link component even if the name prop is not provided.
it("test_no_name_prop", () => {
    const wrapper = shallow(<Brand to="/home" logoPath="https://example.com/logo.png" />);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
});

// Tests that the function renders the Link component and name even if the logoPath prop is not provided.
it("test_no_logo_path_prop", () => {
    const wrapper = mount(<Brand name="Test Name" />);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(0);
    expect(wrapper.find('span').text()).toEqual("Test Name");
});

// Tests that the useMemo hook is correctly memoizing the logo image.
it("test_memoized_logo", () => {
    const wrapper = mount(<Brand logoPath="https://test.com/logo.svg" />);
    const memoizedLogo = wrapper.find('img').html();
    wrapper.setProps({ logoPath: "https://test.com/logo.svg" });
    expect(wrapper.find('img').html()).toEqual(memoizedLogo);
});

// Tests that the CSS classes are correctly applied to the logo image and name prop.
it("test_css_classes_on_logo_and_name", () => {
    const wrapper = mount(<Brand logoPath="https://test.com/logo.svg" name="Test Name" />);
    expect(wrapper.find('img').hasClass('h-6')).toBe(true);
    expect(wrapper.find('img').hasClass('mr-3')).toBe(true);
    expect(wrapper.find('img').hasClass('sm:h-9')).toBe(true);
    expect(wrapper.find('span').hasClass('self-center')).toBe(true);
    expect(wrapper.find('span').hasClass('text-xl')).toBe(true);
    expect(wrapper.find('span').hasClass('font-semibold')).toBe(true);
    expect(wrapper.find('span').hasClass('whitespace-nowrap')).toBe(true);
    expect(wrapper.find('span').hasClass('dark:text-white')).toBe(true);
});
