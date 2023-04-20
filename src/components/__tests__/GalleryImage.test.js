import GalleryImage from "../GalleryImage";

// Tests that the image is displayed with the correct properties.
it("test_image_displayed_correctly", () => {
    const image = {
        image: "https://example.com/image.jpg",
        title: "Example Image",
    };
    const wrapper = shallow(<GalleryImage image={image} />);
    expect(wrapper.find("img").prop("src")).toEqual(image.image);
    expect(wrapper.find("img").prop("alt")).toEqual(image.title);
    expect(wrapper.find("img").prop("title")).toEqual(image.title);
});

// Tests that onImageClick and setShowModal are called with the correct values when the image is clicked.
it("test_on_click_functions_called", () => {
    const image = {
        image: "https://example.com/image.jpg",
        title: "Example Image",
    };
    const onImageClick = jest.fn();
    const setShowModal = jest.fn();
    const wrapper = shallow(
        <GalleryImage
            image={image}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    wrapper.find("img").simulate("click");
    expect(onImageClick).toHaveBeenCalledWith(image);
    expect(setShowModal).toHaveBeenCalledWith(true);
});

// Tests that the function handles null or undefined image properties.
it("test_image_null_undefined", () => {
    const onImageClick = jest.fn();
    const setShowModal = jest.fn();
    const wrapper1 = shallow(
        <GalleryImage
            image={null}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    expect(wrapper1.find("img").exists()).toBe(false);
    const wrapper2 = shallow(
        <GalleryImage
            image={undefined}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    expect(wrapper2.find("img").exists()).toBe(false);
});

// Tests that the function handles null or undefined image properties for title and image.
it("test_image_properties_null_undefined", () => {
    const image = { title: null, image: undefined };
    const onImageClick = jest.fn();
    const setShowModal = jest.fn();
    const wrapper = shallow(
        <GalleryImage
            image={image}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    const img = wrapper.find("img");
    expect(img.prop("src")).toBeUndefined();
    expect(img.prop("alt")).toBeUndefined();
    expect(img.prop("title")).toBeUndefined();
});

// Tests that the CSS classes are applied correctly to the image.
it("test_css_classes_applied_correctly", () => {
    const image = { title: "Test Image", image: "test.jpg" };
    const onImageClick = jest.fn();
    const setShowModal = jest.fn();
    const wrapper = shallow(
        <GalleryImage
            image={image}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    const img = wrapper.find("img");
    expect(img.hasClass("h-full")).toBeTruthy();
    expect(img.hasClass("max-w-full")).toBeTruthy();
    expect(img.hasClass("rounded-lg")).toBeTruthy();
    expect(img.hasClass("cursor-pointer")).toBeTruthy();
    expect(img.hasClass("hover:opacity-75")).toBeTruthy();
    expect(img.hasClass("transition-opacity")).toBeTruthy();
});

// Tests that the alt and title attributes are set correctly for the image.
it("test_alt_and_title_attributes_set_correctly", () => {
    const image = { title: "Test Image", image: "test.jpg" };
    const onImageClick = jest.fn();
    const setShowModal = jest.fn();
    const wrapper = shallow(
        <GalleryImage
            image={image}
            onImageClick={onImageClick}
            setShowModal={setShowModal}
        />
    );
    const img = wrapper.find("img");
    expect(img.prop("alt")).toEqual(image.title);
    expect(img.prop("title")).toEqual(image.title);
});
