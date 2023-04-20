import Gallery from '../Gallery';

// Tests that the Gallery component renders correctly with provided images.
it("test_gallery_renders_correctly", () => {
    const images = [
        { id: 1, title: "Image 1", image: "image1.jpg" },
        { id: 2, title: "Image 2", image: "image2.jpg" },
        { id: 3, title: "Image 3", image: "image3.jpg" },
    ];
    render(<Gallery images={images} />);
    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 2")).toBeInTheDocument();
    expect(screen.getByText("Image 3")).toBeInTheDocument();
});

// Tests that the Gallery component handles empty images array correctly.
it("test_gallery_handles_empty_images", () => {
    render(<Gallery images={[]} />);
    expect(screen.queryByText("Image 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Image 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Image 3")).not.toBeInTheDocument();
});

// Tests that the Gallery component handles a large images array correctly.
it("test_gallery_handles_large_images_array", () => {
    const images = new Array(20).fill().map((_, index) => ({
        id: index + 1,
        title: `Image ${index + 1}`,
        image: `image${index + 1}.jpg`,
    }));
    render(<Gallery images={images} />);
    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 10")).toBeInTheDocument();
    expect(screen.getByText("Image 20")).toBeInTheDocument();
});

// Tests that handleImageClick function sets selectedImage state correctly when an image is clicked.
it("test_gallery_image_click_sets_selected_image_state", () => {
    const images = [
        { id: 1, title: "Image 1", image: "image1.jpg" },
        { id: 2, title: "Image 2", image: "image2.jpg" },
        { id: 3, title: "Image 3", image: "image3.jpg" },
    ];
    const wrapper = mount(<Gallery images={images} />);
    const image = wrapper.find(GalleryImage).first();
    image.simulate("click");
    expect(wrapper.find(ImageView).prop("selectedImage")).toEqual(images[0]);
});

// Tests that ImageView component is rendered with correct props when an image is clicked.
it("test_gallery_imageview_rendered_with_correct_props", () => {
    const images = [
        { id: 1, title: "Image 1", image: "image1.jpg" },
        { id: 2, title: "Image 2", image: "image2.jpg" },
        { id: 3, title: "Image 3", image: "image3.jpg" },
    ];
    const wrapper = mount(<Gallery images={images} />);
    const image = wrapper.find(GalleryImage).first();
    image.simulate("click");
    expect(wrapper.find(ImageView).props()).toEqual({
        selectedImage: images[0],
        showModal: true,
        setShowModal: expect.any(Function),
        setSelectedImage: expect.any(Function),
    });
});

// Tests that the grid layout of Gallery component is correct with the correct number of columns.
it("test_gallery_grid_layout_correct", () => {
    const images = [
        { id: 1, title: "Image 1", image: "image1.jpg" },
        { id: 2, title: "Image 2", image: "image2.jpg" },
        { id: 3, title: "Image 3", image: "image3.jpg" },
        { id: 4, title: "Image 4", image: "image4.jpg" },
        { id: 5, title: "Image 5", image: "image5.jpg" },
        { id: 6, title: "Image 6", image: "image6.jpg" },
    ];
    const wrapper = mount(<Gallery images={images} />);
    expect(wrapper.find(".grid-cols-3").exists()).toBe(true);
    expect(wrapper.find(".grid-cols-6").exists()).toBe(false);
    const images2 = [
        { id: 1, title: "Image 1", image: "image1.jpg" },
        { id: 2, title: "Image 2", image: "image2.jpg" },
        { id: 3, title: "Image 3", image: "image3.jpg" },
        { id: 4, title: "Image 4", image: "image4.jpg" },
        { id: 5, title: "Image 5", image: "image5.jpg" },
    ];
    const wrapper2 = mount(<Gallery images={images2} />);
    expect(wrapper2.find(".grid-cols-3").exists()).toBe(false);
    expect(wrapper2.find(".grid-cols-6").exists()).toBe(true);
});
