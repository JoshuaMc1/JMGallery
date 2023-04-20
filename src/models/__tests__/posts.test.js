
// Tests that the function successfully retrieves JSON data from the API endpoint.
it("test_successful_api_call", async () => {
    // Mock the fetch function to return a successful response with JSON data
    const mockResponse = { data: [{ id: 1, title: "Test Post" }] };
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    // Call the function and expect it to return the mock response
    const result = await posts();
    expect(result).toEqual(mockResponse);

    // Verify that fetch was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
});

// Tests that the function handles invalid or missing headers properly.
it("test_invalid_headers", async () => {
    // Mock the fetch function to return an error response
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: false,
            statusText: "Unauthorized",
        })
    );

    // Call the function and expect it to log an error message
    console.log = jest.fn();
    await posts();
    expect(console.log).toHaveBeenCalledWith("Error", "Unauthorized");

    // Verify that fetch was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
});

// Tests that the function handles large or unexpected JSON responses properly.
it("test_large_json_response", async () => {
    // Mock the fetch function to return a large JSON response
    const mockResponse = { data: Array.from({ length: 10000 }, (_, i) => ({ id: i, title: `Post ${i}` })) };
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        })
    );

    // Call the function and expect it to return the mock response
    const result = await posts();
    expect(result).toEqual(mockResponse);

    // Verify that fetch was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BASE_URL}posts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
});
